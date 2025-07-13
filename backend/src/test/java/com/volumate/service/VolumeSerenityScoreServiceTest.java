package com.volumate.service;

import com.volumate.model.Product;
import com.volumate.service.VolumeSerenityScoreService.VolumeSerenityScore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

class VolumeSerenityScoreServiceTest {
    
    private VolumeSerenityScoreService scoreService;
    
    @BeforeEach
    void setUp() {
        scoreService = new VolumeSerenityScoreService();
    }
    
    @Test
    @DisplayName("Should calculate high score for healthy product")
    void shouldCalculateHighScoreForHealthyProduct() {
        // Given
        Product product = new Product();
        product.setProductName("Organic Oat Bread");
        product.setCategories("bread, whole grain, organic");
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertTrue(score.getScore() >= 8);
        assertEquals("Excellent Choice!", score.getRating());
        assertEquals("#4CAF50", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should calculate low score for unhealthy product")
    void shouldCalculateLowScoreForUnhealthyProduct() {
        // Given
        Product product = new Product();
        product.setProductName("Chocolate Candy Bar");
        product.setCategories("candy, chocolate, sweet");
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertTrue(score.getScore() <= 3);
        assertEquals("Consider a Healthier Option", score.getRating());
        assertEquals("#F44336", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should calculate neutral score for mixed product")
    void shouldCalculateNeutralScoreForMixedProduct() {
        // Given
        Product product = new Product();
        product.setProductName("Mixed Fruit Yogurt");
        product.setCategories("yogurt, fruit, dairy");
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertTrue(score.getScore() >= 6 && score.getScore() < 8);
        assertEquals("Good Choice", score.getRating());
        assertEquals("#8BC34A", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should return cannot determine for product without name")
    void shouldReturnCannotDetermineForProductWithoutName() {
        // Given
        Product product = new Product();
        product.setCategories("bread");
        // productName is null
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertFalse(score.hasScore());
        assertEquals("Could not determine score from available data.", score.getRating());
        assertEquals("#B0B0B0", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should return cannot determine for product without relevant keywords")
    void shouldReturnCannotDetermineForProductWithoutRelevantKeywords() {
        // Given
        Product product = new Product();
        product.setProductName("Unknown Product");
        product.setCategories("unknown category");
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertFalse(score.hasScore());
        assertEquals("Could not determine score from available data.", score.getRating());
        assertEquals("#B0B0B0", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should handle empty categories")
    void shouldHandleEmptyCategories() {
        // Given
        Product product = new Product();
        product.setProductName("Fresh Apple");
        product.setCategories(""); // Empty categories
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertTrue(score.getScore() >= 6);
        assertEquals("Good Choice", score.getRating());
    }
    
    @Test
    @DisplayName("Should handle null categories")
    void shouldHandleNullCategories() {
        // Given
        Product product = new Product();
        product.setProductName("Fresh Apple");
        product.setCategories(null); // Null categories
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertTrue(score.getScore() >= 6);
        assertEquals("Good Choice", score.getRating());
    }
} 