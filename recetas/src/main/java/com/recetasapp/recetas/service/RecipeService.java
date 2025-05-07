package com.recetasapp.recetas.service;

import org.springframework.stereotype.Service;
import com.cohere.api.Cohere;
import com.cohere.api.requests.ChatRequest;
import com.cohere.api.types.NonStreamedChatResponse;

@Service
public class RecipeService {

    private final Cohere cohere;

    public RecipeService(Cohere cohere) {
        this.cohere = cohere;
    }

    public String generateText(String prompt) {
        ChatRequest req = ChatRequest.builder()
                .message(prompt)
                .build();                       // :contentReference[oaicite:0]{index=0}

        // send it and grab the generated text
        NonStreamedChatResponse resp = cohere.chat(req);
        System.out.println(resp.getText());
        return prompt;
    }
}
