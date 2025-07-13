package com.volumate.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenFoodFactsResponse {
    
    @JsonProperty("status")
    private Integer status;
    
    @JsonProperty("status_verbose")
    private String statusVerbose;
    
    @JsonProperty("product")
    private Product product;
    
    @JsonProperty("code")
    private String code;
    
    public boolean isSuccess() {
        return status != null && status == 1 && product != null;
    }
} 