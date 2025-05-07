package com.recetasapp.recetas.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class IngredientsRequest {
    @JsonProperty("ingredientes")
    private List<String> ingredients;

    public List<String> getIngredients() {
        return ingredients;
    }
    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}

