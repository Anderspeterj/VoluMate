import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { saveProduct, getProductByBarcode } from '../utils/database';
import { apiClient } from '../utils/api';
import { Ionicons } from '@expo/vector-icons';

// Score calculation is now handled by the Java backend


const ResultScreen = ({ route, navigation }) => {
  const { barcode } = route.params;
  const { styles: themeStyles } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: 'Scan Resultat' });
    const fetchProduct = async () => {
      try {
        // Check if product is already in our DB
        const existingProduct = await getProductByBarcode(barcode);
        if(existingProduct) {
            setIsSaved(true);
        }

        const productData = await apiClient.getProductByBarcode(barcode);
        console.log('Product data received:', JSON.stringify(productData, null, 2));
        console.log('Image URL:', productData.image_url);
        setProduct(productData);
      } catch (e) {
        setError('Failed to connect to the food database.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode, navigation]);

  // Get score from the backend response
  const score = product?.volumeSerenityScore;
  const rating = product?.volumeSerenityRating;
  const ratingColor = product?.volumeSerenityRatingColor;
  
  console.log('DEBUG - Product object:', JSON.stringify(product, null, 2));
  console.log('DEBUG - Extracted score:', score, 'Type:', typeof score);
  console.log('DEBUG - Extracted rating:', rating, 'Type:', typeof rating);
  console.log('DEBUG - Extracted ratingColor:', ratingColor, 'Type:', typeof ratingColor);
  
  const handleSave = async () => {
    console.log('DEBUG - Score value:', score, 'Type:', typeof score);
    console.log('DEBUG - Rating value:', rating, 'Type:', typeof rating);
    console.log('DEBUG - RatingColor value:', ratingColor, 'Type:', typeof ratingColor);
    
    // Only save if we have a valid score (including 0)
    if (score === null || score === undefined) {
      console.log('Cannot save product without a score');
      return;
    }
    
    const productToSave = {
      barcode,
      name: product.displayName || 'Unknown Product',
      image_url: product.image_url,
      score: score,
      rating: rating || 'No rating available',
      rating_color: ratingColor || '#B0B0B0',
    };
    
    console.log('DEBUG - Product to save:', JSON.stringify(productToSave, null, 2));
    
    try {
      await saveProduct(productToSave);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving product:', error);
      // You could show an alert here if you want
    }
  };


  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={themeStyles.primary} />
        </View>
      );
    }
    
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: themeStyles.accent }]}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: themeStyles.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.retryButtonText, { color: themeStyles.text }]}>Prøv igen</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (product) {
      return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.card, { backgroundColor: themeStyles.card }]}>
            <Text style={[styles.title, { color: themeStyles.text }]}>{product.displayName || 'No product name'}</Text>
            {product.image_url ? (
              <Image source={{ uri: product.image_url }} style={styles.productImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={{color: themeStyles.secondaryText}}>No Image Available</Text>
              </View>
            )}
             <TouchableOpacity
               onPress={handleSave}
               disabled={isSaved}
               style={[styles.saveButton, { backgroundColor: isSaved ? themeStyles.secondaryText : themeStyles.accent }]}
             >
               <Ionicons name={isSaved ? 'checkmark-done-outline' : 'bookmark-outline'} size={20} color={themeStyles.text} />
               <Text style={styles.saveButtonText}>{isSaved ? 'Saved' : 'Gem til senere'}</Text>
             </TouchableOpacity>
          </View>
          <View style={[styles.card, { backgroundColor: themeStyles.card }]}>
            <Text style={styles.scoreTitle}>Mæthedsscore</Text>
            {score !== null ? (
              <View style={styles.scoreContainer}>
                <Text style={[styles.score, { color: ratingColor }]}>{score}</Text>
                <Text style={[styles.scoreTotal, { color: themeStyles.secondaryText }]}>/ 300</Text>
              </View>
            ) : (
              <Text style={[styles.score, { color: '#B0B0B0' }]}>?</Text>
            )}
            <Text style={[styles.rating, { color: themeStyles.text }]}>{rating || 'No rating available'}</Text>
          </View>
        </ScrollView>
      )
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      {renderContent()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.scanAgainButton, { backgroundColor: themeStyles.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="barcode-outline" size={32} color={themeStyles.text} />
          <Text style={[styles.scanAgainButtonText, { color: themeStyles.text }]}>Scan et andet produkt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 80, // Space for the button
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreTitle: {
    fontSize: 18,
    color: '#B0B0B0',
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  score: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  scoreTotal: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  scanAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
  },
  scanAgainButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 15,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultScreen; 