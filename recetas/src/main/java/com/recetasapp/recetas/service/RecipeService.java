package com.recetasapp.recetas.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class RecipeService {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getRecipeConIA(List<String> ingredients) {
            return "✅ Funciona: ingredientes = " + ingredients;


        /*String prompt = "Tengo los siguientes ingredientes en mi heladera: " + String.join(", ", ingredientes) +
                ". ¿Qué recetas saludables y fitness puedo preparar solo con estos ingredientes? Dame 3 opciones detalladas incluyendo pasos y cantidades si es posible.";

        String apiUrl = "https://api.openai.com/v1/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openaiApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "text-davinci-003");
        body.put("prompt", prompt);
        body.put("max_tokens", 500);
        body.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        Map<String, Object> response = restTemplate.postForObject(apiUrl, entity, Map.class);
        List<Map<String, String>> choices = (List<Map<String, String>>) response.get("choices");
        return choices.get(0).get("text").trim();*/
    }
}
