package com.volumate.service;

import com.volumate.model.OpenFoodFactsResponse;
import com.volumate.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Slf4j
public class OpenFoodFactsService {
    
    private final WebClient webClient;
    
    @Value("${external.openfoodfacts.base-url}")
    private String baseUrl;
    
    @Value("${external.openfoodfacts.timeout}")
    private int timeout;
    
    @Value("${external.openfoodfacts.retry-attempts}")
    private int retryAttempts;
    
    public OpenFoodFactsService() {
        this.webClient = WebClient.builder()
            .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(2 * 1024 * 1024)) // 2MB
            .build();
    }
    
    @Cacheable(value = "products", key = "#barcode")
    public Mono<Product> getProductByBarcode(String barcode) {
        log.info("Fetching product with barcode: {}", barcode);
        
        String url = String.format("%s/product/%s.json", baseUrl, barcode);
        log.info("OpenFoodFacts API URL: {}", url);
        
        return webClient.get()
            .uri(url)
            .retrieve()
            .bodyToMono(String.class)
            .doOnNext(rawJson -> log.info("Raw OpenFoodFacts response: {}", rawJson))
            .map(rawJson -> {
                try {
                    ObjectMapper mapper = new ObjectMapper();
                    OpenFoodFactsResponse response = mapper.readValue(rawJson, OpenFoodFactsResponse.class);
                    return processResponse(response);
                } catch (Exception e) {
                    log.error("Failed to parse OpenFoodFacts response: {}", e.getMessage());
                    return null;
                }
            })
            .timeout(Duration.ofMillis(timeout))
            .retryWhen(Retry.fixedDelay(retryAttempts, Duration.ofSeconds(1))
                .filter(this::shouldRetry)
                .doBeforeRetry(retrySignal -> 
                    log.warn("Retrying request for barcode: {} (attempt {})", 
                        barcode, retrySignal.totalRetries() + 1)))
            .doOnSuccess(product -> {
                if (product != null) {
                    log.info("Successfully fetched product: {}", product.getProductName());
                } else {
                    log.warn("Product not found for barcode: {}", barcode);
                }
            })
            .doOnError(error -> 
                log.error("Error fetching product with barcode: {} - {}", barcode, error.getMessage()));
    }
    
    private boolean shouldRetry(Throwable throwable) {
        // Retry on network errors and 5xx server errors
        if (throwable instanceof WebClientResponseException) {
            WebClientResponseException wcre = (WebClientResponseException) throwable;
            return wcre.getStatusCode().is5xxServerError();
        }
        // Retry on other exceptions (network issues, timeouts, etc.)
        return true;
    }
    
    private Product processResponse(OpenFoodFactsResponse response) {
        if (response == null) {
            log.warn("Received null response from OpenFoodFacts API");
            return null;
        }
        
        if (!response.isSuccess()) {
            log.warn("OpenFoodFacts API returned error: status={}, message={}", 
                response.getStatus(), response.getStatusVerbose());
            return null;
        }
        
        Product product = response.getProduct();
        if (product == null) {
            log.warn("Product data is null in successful response");
            return null;
        }
        
        // Set the barcode from the response code if not already set
        if (product.getBarcode() == null && response.getCode() != null) {
            product.setBarcode(response.getCode());
        }
        
        return product;
    }
} 