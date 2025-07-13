package com.volumate.service;

import com.volumate.model.Product;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class VolumeSerenityScoreService {
    
    private static final List<String> GOOD_KEYWORDS = Arrays.asList(
        "oat", "rye", "bread", "vegetable", "fruit", "water", "milk", 
        "yogurt", "cheese", "egg", "chicken", "fish", "nuts", "lentil", 
        "bean", "legume", "whole grain", "organic", "natural", "fresh"
    );
    
    private static final List<String> BAD_KEYWORDS = Arrays.asList(
        "candy", "chocolate", "chips", "crisps", "soda", "sugar", "sweet", 
        "cake", "biscuit", "cookie", "ice-cream", "pizza", "burger", 
        "processed", "artificial", "preservative", "high fructose", "trans fat", "soda", "sugar", "sweet", "kunstigt"
    );
    
    public VolumeSerenityScore calculateScore(Product product) {
        log.debug("Calculating Volume Serenity Score for product: {}", product.getProductName());
        
        // Check if we have enough data to score the product
     /*   if (!product.hasValidData()) {
            log.warn("Insufficient data to calculate score for product");
            return VolumeSerenityScore.cannotDetermine("Could not determine score from available data.");
        } */
        
        String categories = product.getCategoriesLower();
        String productName = product.getProductNameLower();
        String ingredients = product.getIngredientsText() != null ? product.getIngredientsText().toLowerCase() : "";

        
        int score = 5; // Start with neutral score
        int keywordMatches = 0;
        
        // Check for good keywords
        for (String keyword : GOOD_KEYWORDS) {
            if (categories.contains(keyword) || productName.contains(keyword) || ingredients.contains(keyword)) {
                score += 2;
                keywordMatches++;
                log.debug("Found good keyword: {}", keyword);
            }
        }
        
        // Check for bad keywords
        for (String keyword : BAD_KEYWORDS) {
            if (categories.contains(keyword) || productName.contains(keyword) || ingredients.contains(keyword)) {
                score -= 3;
                keywordMatches++;
                log.debug("Found bad keyword: {}", keyword);
            }
        }
        
        // If no relevant keywords found, we can't reliably score
        if (keywordMatches == 0) {
            log.warn("No relevant keywords found for product: {}", product.getProductName());
            return VolumeSerenityScore.cannotDetermine("Could nt determine score from available data.");
        }
        
        // Clamp score between 0 and 10
        score = Math.max(0, Math.min(10, score));
        
        // Determine rating and color
        String rating;
        String ratingColor;
        
        if (score >= 8) {
            rating = "Excellent Choice!";
            ratingColor = "#4CAF50"; // Green
        } else if (score >= 6) {
            rating = "Good Choice";
            ratingColor = "#8BC34A"; // Light Green
        } else if (score <= 3) {
            rating = "Consider a Healthier Option";
            ratingColor = "#F44336"; // Red
        } else {
            rating = "Okay";
            ratingColor = "#FFA500"; // Orange
        }
        
        log.info("Calculated score {} for product: {} - Rating: {}", score, product.getProductName(), rating);
        
        return new VolumeSerenityScore(score, rating, ratingColor);
    }
    
    public static class VolumeSerenityScore {
        private final Integer score;
        private final String rating;
        private final String ratingColor;
        
        public VolumeSerenityScore(Integer score, String rating, String ratingColor) {
            this.score = score;
            this.rating = rating;
            this.ratingColor = ratingColor;
        }
        
        public static VolumeSerenityScore cannotDetermine(String reason) {
            return new VolumeSerenityScore(null, reason, "#B0B0B0");
        }
        
        // Getters
        public Integer getScore() { return score; }
        public String getRating() { return rating; }
        public String getRatingColor() { return ratingColor; }
        
        public boolean hasScore() {
            return score != null;
        }
    }
} 