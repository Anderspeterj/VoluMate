package com.volumate.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class SerientyIndexService {
    
    private final Map<String, Integer> satietyIndex = new HashMap<>();
    
    public SerientyIndexService() {
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

    public Integer calculateSatietyIndex(String foodName) {
        Integer index = 
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
}