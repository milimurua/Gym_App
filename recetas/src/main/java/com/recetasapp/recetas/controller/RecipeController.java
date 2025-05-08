package com.recetasapp.recetas.controller;

import com.recetasapp.recetas.model.IngredientsRequest;
import com.recetasapp.recetas.service.RecipeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetas")
@CrossOrigin(origins = "*")
public class RecipeController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/generar")
    public ResponseEntity<String> generateRecipe(@RequestBody IngredientsRequest request) {
        List<String> ingredients = request.getIngredients();
        logger.info("[GENERATE] JSON recibido: {}", ingredients);
        if (ingredients == null || ingredients.isEmpty()) {
            logger.warn("[GENERATE] Lista de ingredientes vacía");
            return ResponseEntity.badRequest().body("Por favor, envía al menos un ingrediente.");
        }
        String joined = String.join(", ", ingredients);
        // Llamada a Gemini a través del servicio
        String result = recipeService.generateText(joined);
        logger.info("[GENERATE] Respuesta de Gemini: {}", result);
        return ResponseEntity.ok(result);
    }
}
