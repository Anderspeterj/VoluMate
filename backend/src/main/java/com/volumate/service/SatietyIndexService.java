package com.volumate.service;

import org.springframework.stereotype.Service;
import com.volumate.model.Product;
import java.util.*;

@Service
public class SatietyIndexService {
    
    private final Map<String, Integer> satietyIndex = new HashMap<>();
    private final Set<String> priorityCategories = Set.of(
        "rugbrød", "rugbrod", "rye bread", "danish rye", "rugkerner", "da:rugbrød"
    );
    
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
        satietyIndex.put("kiks", 127);
        satietyIndex.put("rundstykker", 105);
        satietyIndex.put("wienerbrød", 50);
        
        // Processed Meats (lower satiety due to processing and high salt/fat)
        satietyIndex.put("salami", 105);
        satietyIndex.put("sausage", 110);
        satietyIndex.put("pølse", 110);
        satietyIndex.put("kødpølse", 110);
        satietyIndex.put("medisterpølse", 130);
        satietyIndex.put("leverpostej", 140);
        satietyIndex.put("rullepølse", 120);
        satietyIndex.put("spegepølse", 110);
        satietyIndex.put("bacon", 95);
        satietyIndex.put("frikadeller", 176);
        satietyIndex.put("fiskefrikadeller", 200);
        satietyIndex.put("flæskesteg", 170);
        satietyIndex.put("roastbeef", 176);
        satietyIndex.put("hakkebøf", 176);
        
        // Snacks and Confectionary
        satietyIndex.put("mars candy bar", 70);
        satietyIndex.put("peanuts", 84);
        satietyIndex.put("yogurt", 88);
        satietyIndex.put("hytteost", 180);
        satietyIndex.put("skyr", 160);
        satietyIndex.put("mælk", 90);
        satietyIndex.put("crisps", 91);
        satietyIndex.put("flæskesvær", 95);
        satietyIndex.put("ice cream", 96);
        satietyIndex.put("jellybeans", 118);
        satietyIndex.put("pizza", 133);
        satietyIndex.put("pizzen", 133);
        satietyIndex.put("salty-snacks", 91);
        satietyIndex.put("popcorn", 154);
        satietyIndex.put("all-bran", 151);
        satietyIndex.put("porridge", 209);
        satietyIndex.put("oatmeal", 209);
        satietyIndex.put("havregryn", 209);
        satietyIndex.put("rolled oats", 209);
        satietyIndex.put("oats", 209);
        satietyIndex.put("havrefras", 209);
        satietyIndex.put("havreflakes", 209);
        satietyIndex.put("cereal flakes", 209);
        satietyIndex.put("rolled flakes", 209);
        satietyIndex.put("kogt skinke", 160);
        satietyIndex.put("hamburg", 160);
        satietyIndex.put("hamburgerryg", 160);
        satietyIndex.put("ham", 160);
        satietyIndex.put("skinke", 160);
        satietyIndex.put("corn", 145);
        satietyIndex.put("majs", 145);


        

        // Danish specific foods
        satietyIndex.put("leverpostej", 140);
        satietyIndex.put("rullepølse", 120);
        satietyIndex.put("salami", 105);
        satietyIndex.put("spegepølse", 110);
        
        // Breakfast Cereals with Milk
        satietyIndex.put("muesli", 100);
        satietyIndex.put("sustain", 112);
        satietyIndex.put("special k", 116);
        satietyIndex.put("cornflakes", 118);
        satietyIndex.put("honeysmacks", 132);
        satietyIndex.put("cereal", 100);
        
        // Carbohydrate-Rich Foods
        satietyIndex.put("white bread", 100);
        satietyIndex.put("franskbrød", 100);
        satietyIndex.put("french fries", 116);
        satietyIndex.put("white pasta", 119);
        satietyIndex.put("brown rice", 132);
        satietyIndex.put("white rice", 138);
        satietyIndex.put("grain bread", 154);
        satietyIndex.put("whole meal bread", 157);
        satietyIndex.put("rugbrød", 170);
        satietyIndex.put("fuldkorn", 154);
        satietyIndex.put("fuldkornbrød", 154);
        satietyIndex.put("fullkorn", 154);
        satietyIndex.put("fullkornbrød", 154);
        satietyIndex.put("smør", 55);
        satietyIndex.put("butter", 55);
        satietyIndex.put("brown pasta", 188);
        satietyIndex.put("potatoes", 323);
        satietyIndex.put("boiled potatoes", 323);
        
        // Protein-Rich Foods
        satietyIndex.put("lentils", 133);
        satietyIndex.put("cheese", 146);
        satietyIndex.put("Ost", 146);
        satietyIndex.put("eggs", 150);
        satietyIndex.put("æg", 150);
        satietyIndex.put("baked beans", 168);
        satietyIndex.put("beef", 176);
        satietyIndex.put("makrel", 185);
        satietyIndex.put("sild", 180);
        satietyIndex.put("rejer", 200);
        satietyIndex.put("ling fish", 225);
        satietyIndex.put("rødspætte", 225);
        satietyIndex.put("fish", 225);
        satietyIndex.put("tuna", 225);
        satietyIndex.put("tunsalat", 175);
        satietyIndex.put("tun", 190);
        satietyIndex.put("salmon", 170);
        satietyIndex.put("laks", 170);

        
        // Fruits
        satietyIndex.put("bananas", 118);
        satietyIndex.put("grapes", 162);
        satietyIndex.put("pære", 190);
        satietyIndex.put("jordbær", 150);
        satietyIndex.put("oranges", 202);
        satietyIndex.put("apples", 197);
        satietyIndex.put("gulerod", 190);
        satietyIndex.put("carrot", 190);
        satietyIndex.put("tomat", 185);
        satietyIndex.put("tomato", 185);
        satietyIndex.put("agurk", 170);
        satietyIndex.put("cucumber", 170);
        satietyIndex.put("broccoli", 235);
        satietyIndex.put("blomkål", 220);
        satietyIndex.put("løg", 140);
        satietyIndex.put("onion", 140);
        satietyIndex.put("røget kød", 170);
        satietyIndex.put("hummus", 125);
        satietyIndex.put("hummu", 125); 
        satietyIndex.put("salat", 150);
        satietyIndex.put("olive oil", 40);
        satietyIndex.put("olivenolie", 40);
        satietyIndex.put("olivenolie", 40);
        satietyIndex.put("solsikkeolie", 40);
        satietyIndex.put("lettuce", 150);
        satietyIndex.put("cake", 65);
        satietyIndex.put("kage", 65);
        satietyIndex.put("riskiks", 65);
        satietyIndex.put("kiks", 65);
        satietyIndex.put("salsa", 65);
        satietyIndex.put("salsasauce", 65);
        satietyIndex.put("müslibar", 65);
        satietyIndex.put("müsli", 65);
        satietyIndex.put("müsli bar", 110);
        satietyIndex.put("müsli bar", 110);
        satietyIndex.put("müsli bar", 110);
        satietyIndex.put("kakao", 75);
        satietyIndex.put("cola", 50);
        satietyIndex.put("ananas", 135);
        satietyIndex.put("nudler", 119);
        satietyIndex.put("minimælk", 85);
        satietyIndex.put("ostehaps", 135);
        satietyIndex.put("mælkesnit", 65);
        satietyIndex.put("grillpølser", 120);
        satietyIndex.put("nakkekoteletter", 175);
        satietyIndex.put("ribeye", 180);
        satietyIndex.put("squash", 170);
        satietyIndex.put("fersken", 150);
        satietyIndex.put("toast", 100);
        satietyIndex.put("pulled pork", 165);
        satietyIndex.put("pulled chicken", 175);
        satietyIndex.put("møllehjul", 100);
        satietyIndex.put("giflar", 68);
        satietyIndex.put("kartoffelsalat", 120);




        
        // Additional variations and common names
        satietyIndex.put("potato", 323);
        satietyIndex.put("knækbrød", 120);
        satietyIndex.put("bread", 120);
        satietyIndex.put("pasta", 119);
        satietyIndex.put("rice", 138);
        satietyIndex.put("cereal", 100);
        satietyIndex.put("chips", 91);
        satietyIndex.put("chocolate", 70);
        satietyIndex.put("kylling", 170);
        satietyIndex.put("kyllingefilet", 170);
        satietyIndex.put("chicken", 170);
        satietyIndex.put("candy", 70);
        satietyIndex.put("slik", 70);
        satietyIndex.put("vingummi", 70);
        satietyIndex.put("lakrids", 70);
        satietyIndex.put("bolcher", 70);
        satietyIndex.put("tyggegummi", 70);
        satietyIndex.put("nuts", 84);
        satietyIndex.put("nødder", 84);
        satietyIndex.put("nødder", 84);
        satietyIndex.put("mandler", 84);
        satietyIndex.put("valnødder", 84);
        satietyIndex.put("cashewnødder", 84);
        satietyIndex.put("hasselnødder", 84);
        satietyIndex.put("pistacienødder", 84);
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

        List<String> keywords = product.getKeywordsLower();
        if (keywords != null) {
            // Special case for sesame crispbread
            boolean hasKnaekbrod = keywords.contains("knækbrød") || keywords.contains("knaekbrød");
            if (hasKnaekbrod && keywords.contains("sesam")) {
                return applyEvidenceBasedAdjustments(product, 148, false);
            }

            boolean isGrainProduct = keywords.stream().anyMatch(k ->
                    k.equals("grain") || k.equals("grain bread") ||
                            k.equals("fuldkorn") || k.equals("fuldkornbrød") ||
                            k.equals("fullkorn") || k.equals("fullkornbrød")
            );
            if (isGrainProduct) {
                return applyEvidenceBasedAdjustments(product, 154, false);
            }
        }

        // First check categories for priority matches (like rugbrød)
        String categories = product.getCategories();
        if (categories != null) {
            String categoriesLower = categories.toLowerCase();
            // Remove language prefixes for matching
            categoriesLower = categoriesLower.replaceAll("(da:|en:|fr:)", "");
            
            // Check for priority categories first
            for (String priorityCategory : priorityCategories) {
                if (categoriesLower.contains(priorityCategory.toLowerCase())) {
                    return applyEvidenceBasedAdjustments(product, satietyIndex.get("rugbrød"), false);
                }
            }
        }

        // If no priority match was found, continue with normal category matching
        
        // Check for oats in categories
        boolean isOatProduct = false;
        if (categories != null) {
            String categoriesLower = categories.toLowerCase();
            isOatProduct = categoriesLower.contains("rolled oats") || 
                          categoriesLower.contains("havregryn") ||
                          (categoriesLower.contains("oat") && !categoriesLower.contains("coating")) ||
                          categoriesLower.contains("havre");
        }
        
        // Check for oats in keywords if not found in categories
        if (!isOatProduct && keywords != null) {
            isOatProduct = keywords.stream().anyMatch(k -> 
                k.equals("oat") || k.equals("oats") || 
                k.equals("havre") || k.equals("havregryn") || 
                k.equals("rolled oats"));
        }
        
        if (isOatProduct) {
            return applyEvidenceBasedAdjustments(product, 209, false);
        }

        // Check if it's a processed meat product
        boolean isProcessedMeat = false;
        if (categories != null) {
            String categoriesLower = categories.toLowerCase();
            // Check for specific processed meat categories
            if ((categoriesLower.contains("processed") && categoriesLower.contains("meat")) || 
                categoriesLower.contains("cured meat") || 
                (categoriesLower.contains("prepared meat") && 
                 !(categoriesLower.contains("ham") || // Exception for ham products
                   categoriesLower.contains("skinke")))) {
                isProcessedMeat = true;
            }
        }

        // First try to get satiety index from categories, but skip misleading categories
        if (categories != null && !categories.isEmpty()) {
            String[] categoryList = categories.toLowerCase().split(",");
            for (String category : categoryList) {
                category = category.trim();
                
                // skip potato-based snacks
                boolean isPotatoSnack = category.contains("potato") &&
                                        (category.contains("snack") || category.contains("salty-snacks") ||
                                         category.contains("puffed") || category.contains("doodle"));

                // Skip cheese-based snacks to avoid using the high satiety score of plain cheese
                boolean isCheeseSnack = category.contains("cheese") &&
                                        (category.contains("snack") || category.contains("salty-snacks") ||
                                         category.contains("puffed") || category.contains("doodle"));

                // Skip generic flakes unless it's specifically oats/havregryn
                boolean isGenericFlakes = category.contains("flakes") &&
                                          !(category.contains("oat") ||
                                            category.contains("havre") ||
                                            category.contains("rolled oats"));
                
                // Also skip general snack categories that aren't covered above
                boolean isGeneralSnack = category.contains("snack") || category.contains("appetizer");

                if (isCheeseSnack || isGenericFlakes || isGeneralSnack) {
                    continue;
                }
                
                Integer categoryScore = getSatietyIndex(category.trim());
                if (categoryScore != null) {
                    return applyEvidenceBasedAdjustments(product, categoryScore, isProcessedMeat);
                }
            }
        }

        // If no match found in categories, fall back to ingredients
        List<String> ingredients = extractIngredients(product.getIngredientsText());
        List<Integer> satietyScores = new ArrayList<>();
        
        // Get the main ingredient (usually first in the list)
        String mainIngredient = ingredients.isEmpty() ? null : ingredients.get(0);
        Integer mainScore = null;
        if (mainIngredient != null) {
            mainScore = getSatietyIndex(mainIngredient);
        }

        // If main ingredient has a score, prioritize it
        if (mainScore != null) {
            return applyEvidenceBasedAdjustments(product, mainScore, isProcessedMeat);
        }

        // Otherwise check all ingredients, but skip misleading ones
        for (String ingredient : ingredients) {
            // Skip misleading ingredients
            if (ingredient.contains("powder") || 
                ingredient.contains("pulver") || 
                ingredient.contains("protein") ||
                ingredient.contains("whey") ||
                ingredient.contains("myse")) {
                continue;
            }
            Integer score = getSatietyIndex(ingredient);
            if (score != null) {
                satietyScores.add(score);
            }
        }
        
        if (!satietyScores.isEmpty()) {
            double sum = satietyScores.stream().mapToInt(Integer::intValue).sum();
            int average = (int) Math.round(sum / satietyScores.size());
            return applyEvidenceBasedAdjustments(product, average, isProcessedMeat);
        }

        // Try product name if no ingredients match
        String productName = product.getProductName();
        if (productName != null && 
            !(productName.toLowerCase().contains("cheese") || 
              productName.toLowerCase().contains("ost"))) {
            Integer nameScore = getSatietyIndex(productName);
            if (nameScore != null) {
                return applyEvidenceBasedAdjustments(product, nameScore, isProcessedMeat);
            }
        }

        // As a final fallback, check keywords
        List<String> keywordsList = product.getKeywordsLower();
        
        // First check if we have clear oat/havregryn keywords
        boolean isOatProductFinal = keywordsList.stream().anyMatch(k -> 
            k.equals("oat") || k.equals("oats") || 
            k.equals("havre") || k.equals("havregryn") || 
            k.equals("rolled oats"));
            
        // If it's an oat product, prioritize that
        if (isOatProductFinal) {
            return applyEvidenceBasedAdjustments(product, 209, isProcessedMeat);
        }
        
        // Otherwise try each keyword individually
        for (String keyword : keywordsList) {
            // Skip general flakes unless specifically oat/havre related
            if (keyword.contains("flakes") && 
                !(keyword.contains("oat") || 
                  keyword.contains("havre") || 
                  keyword.contains("rolled oats"))) {
                continue;
            }
            Integer keywordScore = getSatietyIndex(keyword);
            if (keywordScore != null) {
                return applyEvidenceBasedAdjustments(product, keywordScore, isProcessedMeat);
            }
        }
        
        // If no individual keyword matches, try combinations of adjacent keywords
        for (int i = 0; i < keywordsList.size() - 1; i++) {
            String combinedKeywords = keywordsList.get(i) + " " + keywordsList.get(i + 1);
            // Skip general flakes combinations unless specifically oat/havre related
            if (combinedKeywords.contains("flakes") && 
                !(combinedKeywords.contains("oat") || 
                  combinedKeywords.contains("havre") || 
                  combinedKeywords.contains("rolled oats"))) {
                continue;
            }
            Integer combinedScore = getSatietyIndex(combinedKeywords);
            if (combinedScore != null) {
                return applyEvidenceBasedAdjustments(product, combinedScore, isProcessedMeat);
            }
        }
        
        return null;
    }
    
    public Integer getSatietyIndex(String foodName) {
        if (foodName == null) {
            return null;
        }
        
        String normalizedName = foodName.toLowerCase().trim();
        // Remove language prefixes for matching
        normalizedName = normalizedName.replaceAll("(da:|en:|fr:)", "");
        
        // Try exact match first
        Integer index = satietyIndex.get(normalizedName);
        if (index != null) {
            return index;
        }
        
        // Try to find the best partial match (longest key that matches as a whole word)
        String bestMatchKey = null;
        for (String key : satietyIndex.keySet()) {
            // Use word boundary regex to ensure we match whole words
            String pattern = "\\b" + java.util.regex.Pattern.quote(key) + "\\b";
            if (java.util.regex.Pattern.compile(pattern).matcher(normalizedName).find()) {
                if (bestMatchKey == null || key.length() > bestMatchKey.length()) {
                    bestMatchKey = key;
                }
            }
        }

        if (bestMatchKey != null) {
            return satietyIndex.get(bestMatchKey);
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
    // extract ingredients from product.getIngredientsText()
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

    private Integer applyEvidenceBasedAdjustments(Product product, int baseSatiety, boolean isProcessedMeat) {
        double adjustedSatiety = baseSatiety;
        
        // Processed meat adjustment (apply first)
        if (isProcessedMeat) {
            adjustedSatiety *= 0.7; // Reduce satiety by 30% for processed meats
        }

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
                    adjustedSatiety *= 0.85;
                } else if (sugars >= 10) {
                    adjustedSatiety *= 0.88;
                } else if (sugars >= 8) {    
                    adjustedSatiety *= 0.90;
                } else if (sugars >= 6) {
                    adjustedSatiety *= 0.92;
                } else if (sugars >= 4) {
                    adjustedSatiety *= 0.95;
                }
            }
        }

        // Fat content adjustment (especially important for processed meats)
        if (nutriments != null && nutriments.containsKey("fat_100g")) {
            Double fat = getDoubleValue(nutriments.get("fat_100g"));
            if (fat != null) {
                if (fat >= 30) {
                    adjustedSatiety *= 0.85; // High fat (≥30g/100g) - 15% reduction
                } else if (fat >= 20) {
                    adjustedSatiety *= 0.90; // Medium-high fat (20-30g/100g) - 10% reduction
                } else if (fat >= 10) {
                    adjustedSatiety *= 0.95; // Medium fat (10-20g/100g) - 5% reduction
                }
            }
        }

        // Salt content adjustment (especially important for processed meats)
        if (nutriments != null && nutriments.containsKey("salt_100g")) {
            Double salt = getDoubleValue(nutriments.get("salt_100g"));
            if (salt != null) {
                if (salt >= 3) {
                    adjustedSatiety *= 0.85; // Very high salt (≥3g/100g) - 15% reduction
                } else if (salt >= 2) {
                    adjustedSatiety *= 0.90; // High salt (2-3g/100g) - 10% reduction
                } else if (salt >= 1.5) {
                    adjustedSatiety *= 0.95; // Medium-high salt (1.5-2g/100g) - 5% reduction
                }
            }
        }

        // After all reductions, apply positive adjustments
        
        // Water content adjustment (important factor for satiety)
        if (nutriments != null && nutriments.containsKey("water_100g")) {
            Double waterContent = getDoubleValue(nutriments.get("water_100g"));
            if (waterContent != null) {
                if (waterContent >= 80) {
                    adjustedSatiety *= 1.10;  // High water content (fruits, vegetables) - 10% boost
                } else if (waterContent >= 60) {
                    adjustedSatiety *= 1.07;  // Medium-high water content - 7% boost
                } else if (waterContent >= 40) {
                    adjustedSatiety *= 1.05;  // Medium water content - 5% boost
                }
            }
        }
        
        // Protein content adjustment (protein is highly satiating)
        if (nutriments != null && nutriments.containsKey("proteins_100g")) {
            Double proteinContent = getDoubleValue(nutriments.get("proteins_100g"));
            if (proteinContent != null) {
                if (proteinContent >= 20) {
                    adjustedSatiety *= 1.15;  // High protein (≥20g/100g) - 15% boost
                } else if (proteinContent >= 15) {
                    adjustedSatiety *= 1.10;  // Medium-high protein (15-20g/100g) - 10% boost
                } else if (proteinContent >= 10) {
                    adjustedSatiety *= 1.07;  // Medium protein (10-15g/100g) - 7% boost
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