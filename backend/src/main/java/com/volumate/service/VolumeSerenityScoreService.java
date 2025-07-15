package com.volumate.service;

import com.volumate.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class VolumeSerenityScoreService {
    
    @Autowired
    private SatietyIndexService satietyIndexService;
    
    public VolumeSerenityScore calculateScore(Product product) {
        log.debug("Calculating Volume Serenity Score for product: {}", product.getProductName());

        Integer satietyScore = satietyIndexService.calculateSatietyIndex(product);

        if (satietyScore == null) {
            log.warn("Could not calculate satiety score for product: {}", product.getProductName());
            return VolumeSerenityScore.cannotDetermine("Could not determine score from available data.");
        }

        VolumeSerenityScore finalScore = createVolumeSerenityScore(satietyScore);

        log.info("Final Volume Serenity Score: {} for product: {} - Rating: {}",
                finalScore.getScore(), product.getProductName(), finalScore.getRating());

        return finalScore;
    }

    private VolumeSerenityScore createVolumeSerenityScore(int score) {
        String rating;
        String ratingColor;
        
        if (score >= 250) {
            rating = "Excellent Choice!";
            ratingColor = "#4CAF50";
        } else if (score >= 200) {
            rating = "Very Good Choice";
            ratingColor = "#8BC34A";
        } else if (score >= 150) {
            rating = "Good Choice";
            ratingColor = "#CDDC39";
        } else if (score >= 100) {
            rating = "Okay";
            ratingColor = "#FFA500";
        } else if (score >= 50) {
            rating = "Consider a Healthier Option";
            ratingColor = "#FF9800";
        } else {
            rating = "Poor Choice";
            ratingColor = "#F44336";
        }
        
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
        
        public Integer getScore() { return score; }
        public String getRating() { return rating; }
        public String getRatingColor() { return ratingColor; }
        
        public boolean hasScore() {
            return score != null;
        }
    }
} 