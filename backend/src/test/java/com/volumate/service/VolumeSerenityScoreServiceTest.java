package com.volumate.service;

import com.volumate.model.Product;
import com.volumate.service.VolumeSerenityScoreService.VolumeSerenityScore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class VolumeSerenityScoreServiceTest {
    
    @Mock
    private SatietyIndexService satietyIndexService;

    @InjectMocks
    private VolumeSerenityScoreService scoreService;
    
    @Test
    @DisplayName("Should calculate high score for healthy product")
    void shouldCalculateHighScoreForHealthyProduct() {
        // Given
        Product product = new Product();
        product.setProductName("Organic Oat Bread");
        product.setCategories("bread, whole grain, organic");
        
        when(satietyIndexService.calculateSatietyIndex(product)).thenReturn(209);

        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertEquals(209, score.getScore());
        assertEquals("Meget mættende!", score.getRating());
        assertEquals("#8BC34A", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should calculate low score for unhealthy product")
    void shouldCalculateLowScoreForUnhealthyProduct() {
        // Given
        Product product = new Product();
        product.setProductName("Chocolate Candy Bar");
        product.setCategories("candy, chocolate, sweet");
        
        when(satietyIndexService.calculateSatietyIndex(product)).thenReturn(70);

        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertEquals(70, score.getScore());
        assertEquals("Overvej et andet alternativ hvis du vil undgå at blive sulten hurtigt igen", score.getRating());
        assertEquals("#FF9800", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should calculate neutral score for mixed product")
    void shouldCalculateNeutralScoreForMixedProduct() {
        // Given
        Product product = new Product();
        product.setProductName("Mixed Fruit Yogurt");
        product.setCategories("yogurt, fruit, dairy");
        
        when(satietyIndexService.calculateSatietyIndex(product)).thenReturn(150);
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertEquals(150, score.getScore());
        assertEquals("Godt mættende!", score.getRating());
        assertEquals("#8BC34A", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should return cannot determine for product without name")
    void shouldReturnCannotDetermineForProductWithoutName() {
        // Given
        Product product = new Product();
        product.setCategories("bread");
        // productName is null

        when(satietyIndexService.calculateSatietyIndex(product)).thenReturn(null);
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertFalse(score.hasScore());
        assertEquals("Desværre ingen mæthedsscore kunne findes. Det kan være fordi det er en drikkevare.", score.getRating());
        assertEquals("#B0B0B0", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should return cannot determine for product without relevant keywords")
    void shouldReturnCannotDetermineForProductWithoutRelevantKeywords() {
        // Given
        Product product = new Product();
        product.setProductName("Unknown Product");
        product.setCategories("unknown category");
        
        when(satietyIndexService.calculateSatietyIndex(product)).thenReturn(null);

        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertFalse(score.hasScore());
        assertEquals("Desværre ingen mæthedsscore kunne findes. Det kan være fordi det er en drikkevare.", score.getRating());
        assertEquals("#B0B0B0", score.getRatingColor());
    }
    
    @Test
    @DisplayName("Should handle empty categories")
    void shouldHandleEmptyCategories() {
        // Given
        Product product = new Product();
        product.setProductName("Fresh Apple");
        product.setCategories(""); // Empty categories
        
        when(satietyIndexService.calculateSatietyIndex(product)).thenReturn(197);

        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertEquals(197, score.getScore());
        assertEquals("Godt mættende!", score.getRating());
    }
    
    @Test
    @DisplayName("Should handle null categories")
    void shouldHandleNullCategories() {
        // Given
        Product product = new Product();
        product.setProductName("Fresh Apple");
        product.setCategories(null); // Null categories
        
        when(satietyIndexService.calculateSatietyIndex(product)).thenReturn(197);
        
        // When
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Then
        assertTrue(score.hasScore());
        assertEquals(197, score.getScore());
        assertEquals("Godt mættende!", score.getRating());
    }
} 