package com.recetasapp.recetas.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class RecipeService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiUrl;

    @Value("${gemini.api.key}")
    private String geminiKey;

    public RecipeService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    /**
     * Genera una receta usando la API de Gemini y devuelve la respuesta.
     */
    public String generateText(String ingredientsCsv) {
        // Construir prompt
        String prompt = "Crea una receta usando estos ingredientes: " + ingredientsCsv;

        // Payload JSON para Gemini
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        JsonNode json;
        try {
            System.out.println(requestBody);
            System.out.println(geminiUrl);
            // Hacer la llamada POST construyendo URL completa
            Mono<JsonNode> responseMono = webClient.post()
                    .uri(geminiUrl + geminiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(JsonNode.class);

            json = responseMono.block();
            System.out.println(json);
        } catch (Exception e) {
            throw new RuntimeException("Error al llamar a Gemini: " + e.getMessage(), e);
        }

        if (json == null) {
            throw new IllegalStateException("No se recibió respuesta de Gemini");
        }

        JsonNode candidates = json.path("candidates");
        if (candidates.isArray() && candidates.size() > 0) {
            JsonNode first = candidates.get(0);

            // Si existe “output” y no está vacío, úsalo:
            if (first.hasNonNull("output") && !first.path("output").asText().isBlank()) {
                return first.path("output").asText();
            }

            // Sino, busca en content.parts[0].text
            JsonNode parts = first.path("content").path("parts");
            if (parts.isArray() && parts.size() > 0) {
                return parts.get(0).path("text").asText();
            }
        }

        throw new IllegalStateException("Respuesta inesperada de Gemini: " + json);
    }
}
