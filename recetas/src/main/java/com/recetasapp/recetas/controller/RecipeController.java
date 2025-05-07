package com.recetasapp.recetas.controller;

import com.recetasapp.recetas.service.*;
import com.recetasapp.recetas.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;        // ← este
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping(
            path = "/recetas",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> generateRecipe(@RequestBody IngredientsRequest request) {
        String respuesta = recipeService.getRecipeConIA(request.getIngredients());
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("✅ API Recetas viva y respondiendo.");
    }

}
