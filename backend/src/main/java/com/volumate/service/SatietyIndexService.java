package com.volumate.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

@Service
public class SatietyIndexService {
    
    private final Map<String, Integer> satietyIndex = new HashMap<>();
    
    public SatietyIndexService() {
        initializeSatietyIndex();
    }
    
    private void initializeSatietyIndex() {
        // Bakery Products
        satietyIndex.put("croissant", 47);
        satietyIndex.put("cake", 65);
        satietyIndex.put("doughnuts", 68);
        satietyIndex.put("cookies", 120);
        satietyIndex.put("crackers", 127);
        
        // Snacks and Confectionary
        satietyIndex.put("mars candy bar", 70);
        satietyIndex.put("peanuts", 84);
        satietyIndex.put("yogurt", 88);
        satietyIndex.put("crisps", 91);
        satietyIndex.put("ice cream", 96);
        satietyIndex.put("jellybeans", 118);
        satietyIndex.put("popcorn", 154);
        satietyIndex.put("all-bran", 151);
        satietyIndex.put("porridge", 209);
        satietyIndex.put("oatmeal", 209);
        
        // Breakfast Cereals with Milk
        satietyIndex.put("muesli", 100);
        satietyIndex.put("sustain", 112);
        satietyIndex.put("special k", 116);
        satietyIndex.put("cornflakes", 118);
        satietyIndex.put("honeysmacks", 132);
        
        // Carbohydrate-Rich Foods
        satietyIndex.put("white bread", 100);
        satietyIndex.put("french fries", 116);
        satietyIndex.put("white pasta", 119);
        satietyIndex.put("brown rice", 132);
        satietyIndex.put("white rice", 138);
        satietyIndex.put("grain bread", 154);
        satietyIndex.put("whole meal bread", 157);
        satietyIndex.put("brown pasta", 188);
        satietyIndex.put("potatoes", 323);
        satietyIndex.put("boiled potatoes", 323);
        
        // Protein-Rich Foods
        satietyIndex.put("lentils", 133);
        satietyIndex.put("cheese", 146);
        satietyIndex.put("eggs", 150);
        satietyIndex.put("baked beans", 168);
        satietyIndex.put("beef", 176);
        satietyIndex.put("ling fish", 225);
        satietyIndex.put("fish", 225);
        
        // Fruits
        satietyIndex.put("bananas", 118);
        satietyIndex.put("grapes", 162);
        satietyIndex.put("oranges", 202);
        satietyIndex.put("apples", 197);
        
        // Additional variations and common names
        satietyIndex.put("potato", 323);
        satietyIndex.put("bread", 100);
        satietyIndex.put("pasta", 119);
        satietyIndex.put("rice", 138);
        satietyIndex.put("cereal", 100);
        satietyIndex.put("chips", 91);
        satietyIndex.put("chocolate", 70);
        satietyIndex.put("candy", 70);
        satietyIndex.put("nuts", 84);
        satietyIndex.put("yoghurt", 88);
        satietyIndex.put("ice cream", 96);
        satietyIndex.put("popcorn", 154);
        satietyIndex.put("beans", 168);
        satietyIndex.put("meat", 176);
        satietyIndex.put("fruit", 150);
    }

    public Integer calculateSatietyIndex(Product product) {
    if (product == null) {
        return null;
    }
    List<String> ingredients = extractIngredients(product.getIngredientsText());

    List<Integer> satietyScores = new ArrayList<>();
    for (String ingredient : ingredients) {
        Integer score = getSatietyIndex(ingredient);
        if (score != null) {
            satietyScores.add(score);
        }
    }
    
    if (satietyScores.isEmpty()) {
        return getSatietyIndex(product.getProductName());
    }
    
    double sum = satietyScores.stream().mapToInt(Integer::intValue).sum();
    int average = (int) Math.round(sum / satietyScores.size());
    return applyEvidenceBasedAdjustments(product, average);
}
    
    public Integer getSatietyIndex(String foodName) {
        if (foodName == null) {
            return null;
        }
        
        String normalizedName = foodName.toLowerCase().trim();
        
        // Try exact match first
        Integer index = satietyIndex.get(normalizedName);
        if (index != null) {
            return index;
        }
        
        // Try partial matches
        for (Map.Entry<String, Integer> entry : satietyIndex.entrySet()) {
            if (normalizedName.contains(entry.getKey()) || entry.getKey().contains(normalizedName)) {
                return entry.getValue();
            }
        }
        
        return null; // Not found in satiety index
    }
    
    public String getSatietyDescription(Integer satietyIndex) {
        if (satietyIndex == null) {
            return "Unknown satiety level";
        }
        
        if (satietyIndex >= 200) {
            return "Very High Satiety";
        } else if (satietyIndex >= 150) {
            return "High Satiety";
        } else if (satietyIndex >= 120) {
            return "Moderate-High Satiety";
        } else if (satietyIndex >= 100) {
            return "Moderate Satiety";
        } else if (satietyIndex >= 80) {
            return "Moderate-Low Satiety";
        } else {
            return "Low Satiety";
        }
    }

    public String getSatietyIndexWithPercentage(Integer satietyIndex) {
        if (satietyIndex == null) {
            return "Unknown satiety level";
        }
        
        return satietyIndex + "%";
    }
    
    public Map<String, Integer> getAllSatietyIndices() {
        return new HashMap<>(satietyIndex);
    }
    // extract ingredients from product.getIngredientsText()¨
    private List<String> extractIngredients(String ingredientsText) {
        List<String> ingredients = new ArrayList<>();
        if (ingredientsText != null) {
            String[] parts = ingredientsText.toLowerCase()
                .split("[,;()]");
            
            for (String part : parts) {
                String cleaned = part.trim();
                if (!cleaned.isEmpty() && cleaned.length() > 2) {
                    ingredients.add(cleaned);
                }
            }
        }
        return ingredients;
    }

    private Integer applyEvidenceBasedAdjustments(Product product, int baseSatiety) {
        double adjustedSatiety = baseSatiety;
        
        // NOVA Group adjustment (processing level)
        String novaGroup = product.getNovaGroup();
        if (novaGroup != null) {
            adjustedSatiety *= switch (novaGroup) {
                case "1" -> 1.0;    // Unprocessed - no reduction
                case "2" -> 0.95;   // Processed culinary - 5% reduction
                case "3", "4" -> 0.8; // Processed & ultra-processed - 20% reduction
                default -> 1.0;     // Unknown - no reduction
            };
        }
        
        // Sugar content adjustment
        Map<String, Object> nutriments = product.getNutriments();
        if (nutriments != null && nutriments.containsKey("sugars_100g")) {
            Double sugars = getDoubleValue(nutriments.get("sugars_100g"));
            if (sugars != null && sugars >= 4) {
                if (sugars >= 12) {
                    adjustedSatiety *= 0.85;  // Fixed: comma -> period
                } else if (sugars >= 10) {
                    adjustedSatiety *= 0.88;  // Fixed: comma -> period
                } else if (sugars >= 8) {    
                    adjustedSatiety *= 0.90;  // Fixed: comma -> period
                } else if (sugars >= 6) {
                    adjustedSatiety *= 0.92;  // Fixed: comma -> period
                } else if (sugars >= 4) {
                    adjustedSatiety *= 1.0;   // Fixed: comma -> period
                }
            }
        }
        
        // Water content adjustment (important factor for satiety)
        if (nutriments != null && nutriments.containsKey("water_100g")) {
            Double waterContent = getDoubleValue(nutriments.get("water_100g"));
            if (waterContent != null) {
                if (waterContent >= 80) {
                    adjustedSatiety *= 1.15;  // High water content (fruits, vegetables) - 15% boost
                } else if (waterContent >= 60) {
                    adjustedSatiety *= 1.10;  // Medium-high water content - 10% boost
                } else if (waterContent >= 40) {
                    adjustedSatiety *= 1.05;  // Medium water content - 5% boost
                }
                // Low water content gets no boost
            }
        }
        
        // Protein content adjustment (protein is highly satiating)
        if (nutriments != null && nutriments.containsKey("proteins_100g")) {
            Double proteinContent = getDoubleValue(nutriments.get("proteins_100g"));
            if (proteinContent != null) {
                if (proteinContent >= 20) {
                    adjustedSatiety *= 1.20;  // High protein (≥20g/100g) - 20% boost
                } else if (proteinContent >= 15) {
                    adjustedSatiety *= 1.15;  // Medium-high protein (15-20g/100g) - 15% boost
                } else if (proteinContent >= 10) {
                    adjustedSatiety *= 1.10;  // Medium protein (10-15g/100g) - 10% boost
                } else if (proteinContent >= 5) {
                    adjustedSatiety *= 1.05;  // Low-medium protein (5-10g/100g) - 5% boost
                }
            }
        }
        
        // Fiber content adjustment (fiber is highly satiating)
        if (nutriments != null && nutriments.containsKey("fiber_100g")) {
            Double fiberContent = getDoubleValue(nutriments.get("fiber_100g"));
            if (fiberContent != null) {
                if (fiberContent >= 8) {
                    adjustedSatiety *= 1.15;  // High fiber (≥8g/100g) - 15% boost
                } else if (fiberContent >= 5) {
                    adjustedSatiety *= 1.10;  // Medium-high fiber (5-8g/100g) - 10% boost
                } else if (fiberContent >= 3) {
                    adjustedSatiety *= 1.05;  // Medium fiber (3-5g/100g) - 5% boost
                }
            }
        }
        
        return (int) Math.round(adjustedSatiety);
    }

    // Helper method to convert Object to Double
    private Double getDoubleValue(Object value) {
        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        } else if (value instanceof String) {
            try {
                return Double.parseDouble((String) value);
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }



}