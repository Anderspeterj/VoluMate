package com.volumate.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {
    
    @JsonProperty("code")
    private String barcode;
    
    @JsonProperty("product_name")
    private String productName;
    
    @JsonProperty("generic_name")
    private String genericName;
    
    @JsonProperty("brands")
    private String brands;
    
    @JsonProperty("categories")
    private String categories;
    
    @JsonProperty("image_url")
    private String image_url;
    
    @JsonProperty("ingredients_text")
    private String ingredientsText;
    
    @JsonProperty("nutrition_grade_fr")
    private String nutritionGrade;
    
    @JsonProperty("nutriments")
    private Map<String, Object> nutriments;
    
    @JsonProperty("allergens_tags")
    private List<String> allergensTags;
    
    @JsonProperty("additives_tags")
    private List<String> additivesTags;
    
    @JsonProperty("ingredients_analysis_tags")
    private List<String> ingredientsAnalysisTags;
    
    @JsonProperty("nova_group")
    private String novaGroup;
    
    @JsonProperty("ecoscore_grade")
    private String ecoscoreGrade;
    
    @JsonProperty("product_name_da")
    private String productNameDa;
    
    // Custom fields for our application
    private Integer volumeSerenityScore;
    private String volumeSerenityRating;
    private String volumeSerenityRatingColor;
    
    // Helper methods
  /*  public boolean hasValidData() {
        return productName != null && !productName.trim().isEmpty();
    }  */
    
    public String getCategoriesLower() {
        return categories != null ? categories.toLowerCase() : "";
    }
    
    public String getProductNameLower() {
        return productName != null ? productName.toLowerCase() : "";
    }

    public String getDisplayName() {
        if (productName != null && !productName.isEmpty()) {
            return productName;
        } else if (productNameDa != null && !productNameDa.isEmpty()) {
            return productNameDa;
        } else {
            return null;
        }
    }
} 