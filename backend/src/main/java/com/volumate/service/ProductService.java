package com.volumate.service;

import com.volumate.model.Product;
import com.volumate.service.VolumeSerenityScoreService.VolumeSerenityScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ProductService {
    
    private final OpenFoodFactsService openFoodFactsService;
    private final VolumeSerenityScoreService scoreService;
    
    @Autowired
    public ProductService(OpenFoodFactsService openFoodFactsService, 
                        VolumeSerenityScoreService scoreService) {
        this.openFoodFactsService = openFoodFactsService;
        this.scoreService = scoreService;
    }
    
    public Mono<Product> getProductWithScore(String barcode) {
        log.info("Processing product request for barcode: {}", barcode);
        
        return openFoodFactsService.getProductByBarcode(barcode)
            .map(this::enrichProductWithScore)
            .doOnSuccess(product -> {
                if (product != null) {
                    log.info("Successfully processed product: {} with score: {}", 
                        product.getProductName(), product.getVolumeSerenityScore());
                }
            })
            .doOnError(error -> 
                log.error("Error processing product with barcode: {} - {}", barcode, error.getMessage()));
    }
    
    private Product enrichProductWithScore(Product product) {
        if (product == null) {
            log.warn("Cannot calculate score for null product");
            return null;
        }
        
        VolumeSerenityScore score = scoreService.calculateScore(product);
        
        // Set the calculated score data on the product
        product.setVolumeSerenityScore(score.getScore());
        product.setVolumeSerenityRating(score.getRating());
        product.setVolumeSerenityRatingColor(score.getRatingColor());
        
        log.debug("Enriched product {} with score: {}", product.getProductName(), score.getScore());
        
        return product;
    }
} 