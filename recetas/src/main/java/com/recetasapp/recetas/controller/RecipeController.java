package com.recetasapp.recetas.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.recetasapp.recetas.model.IngredientsRequest;
import com.recetasapp.recetas.service.RecipeService;


@Controller
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("Titulo", "Recetas App – Servidor conectado");
        return "index";
    }

    // POST "/api/recetas" → devuelve el texto generado
    @PostMapping("/api/recetas")
    public @ResponseBody ResponseEntity<String> generar(@RequestBody IngredientsRequest req) {
        String prompt = "Crea una receta con estos ingredientes: " + String.join(", ", req.getIngredients());
        String recipe = recipeService.generateText(prompt);  // Asegúrate de que devuelva String
        return ResponseEntity.ok(recipe);
    }
}
