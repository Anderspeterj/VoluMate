package com.volumate.controller;

import com.volumate.model.ApiResponse;
import com.volumate.model.Product;
import com.volumate.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*") // Configure properly for production
@Slf4j
public class ProductController {
    
    private final ProductService productService;
    
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping("/{barcode}")
    public Mono<ResponseEntity<ApiResponse<Product>>> getProductByBarcode(
            @PathVariable 
            @NotBlank(message = "Barcode cannot be empty")
            @Pattern(regexp = "^[0-9]{8,13}$", message = "Barcode must be 8-13 digits")
            String barcode) {
        
        log.info("Received request for product with barcode: {}", barcode);
        
        return productService.getProductWithScore(barcode)
            .map(product -> {
                if (product != null) {
                    log.info("Successfully retrieved product: {}", product.getProductName());
                    return ResponseEntity.ok(ApiResponse.success(product));
                } else {
                    log.warn("Product not found for barcode: {}", barcode);
                    return ResponseEntity.ok(ApiResponse.<Product>error("Product not found", null));
                }
            })
            .onErrorResume(error -> {
                log.error("Error processing request for barcode: {} - {}", barcode, error.getMessage());
                return Mono.just(ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to fetch product data", error.getMessage())));
            });
    }
    
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        log.debug("Health check endpoint called");
        return ResponseEntity.ok(ApiResponse.success("Service is running", "VoluMate Backend is healthy"));
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<String>> handleValidationError(IllegalArgumentException e) {
        log.warn("Validation error: {}", e.getMessage());
        return ResponseEntity.badRequest()
            .body(ApiResponse.error("Invalid input", e.getMessage()));
    }
} 