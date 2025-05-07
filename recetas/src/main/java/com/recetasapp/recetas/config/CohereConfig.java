package com.recetasapp.recetas.config;

import com.cohere.api.Cohere;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CohereConfig {
    @Value("${cohere.api.token}")
    private String apiToken;

    @Bean
    public Cohere cohereClient() {
        return Cohere.builder()
                .token(apiToken)
                .build();
    }
}
