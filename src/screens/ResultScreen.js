import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { saveProduct, getProductByBarcode } from '../utils/database';
import { apiClient } from '../utils/api';
import { Ionicons } from '@expo/vector-icons';

// Score calculation is now handled by the Java backend

// Helper functions for nutrition information
const getNutriScoreDescription = (grade) => {
  switch (grade?.toLowerCase()) {
    case 'a': return 'Excellent nutritional quality';
    case 'b': return 'Good nutritional quality';
    case 'c': return 'Average nutritional quality';
    case 'd': return 'Poor nutritional quality';
    case 'e': return 'Very poor nutritional quality';
    default: return 'Average nutritional quality';
  }
};

const getNovaGroupDescription = (group) => {
  switch (group) {
    case '1': return 'Unprocessed foods';
    case '2': return 'Processed culinary ingredients';
    case '3': return 'Processed foods';
    case '4': return 'Ultra-processed foods';
    default: return 'Processed foods';
  }
};

const getNutriScoreColor = (grade) => {
  switch (grade?.toLowerCase()) {
    case 'a': return '#038141'; // Green
    case 'b': return '#85BB2F'; // Yellow
    case 'c': return '#FECB02'; // Orange 
    case 'd': return '#EF8200'; // Red
    case 'e': return '#E63E11'; // Dark Red
    default: return '#B0B0B0'; // Gray
  }
};

const getNovaGroupColor = (group) => {
  switch (group) {
    case '1': return '#038141'; // Green
    case '2': return '#85BB2F'; // Yellow
    case '3': return '#FECB02'; // Orange
    case '4': return '#c92f32'; // Red
    default: return '#B0B0B0'; // Gray
  }
};

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
          <View style={[styles.card, { backgroundColor: themeStyles.card, marginTop: 110, borderRadius: 15, borderWidth: 0.15, borderColor: '#FFFFFF' }]}>
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
          <View style={[styles.card, { backgroundColor: themeStyles.card, borderRadius: 15, borderWidth: 0.15, borderColor: '#FFFFFF' }]}>
            <Text style={styles.scoreTitle}>Mæthedsscore</Text>
            {score !== null ? (
              <View style={styles.scoreContainer}>
                <Text style={[styles.score, { color: ratingColor }]}>{score}</Text>
                <Text style={[styles.scoreTotal, { color: themeStyles.secondaryText }]}>/100</Text>
              </View>
            ) : (
              <Text style={[styles.score, { color: '#B0B0B0' }]}>?</Text>
            )}
            <Text style={[styles.rating, { color: themeStyles.text }]}>{rating || 'No rating available'}</Text>
          </View>

          {/* Nutri-Score and NOVA Group Cards */}
          <View style={styles.nutritionContainer}>
            {/* Nutri-Score Card */}
            <View style={[styles.nutritionCard, { backgroundColor: themeStyles.card, borderWidth: 0.2, borderColor: '#FFFFFF' }]}>
              <View style={styles.nutritionIconContainer}>
                <View style={styles.nutriScoreIcon}>
                  <Text style={styles.nutriScoreText}>NUTRI-SCORE</Text>
                  <View style={styles.nutriScoreBar}>
                    <View style={[styles.nutriScoreSegment, { backgroundColor: '#038141' }]} />
                    <View style={[styles.nutriScoreSegment, { backgroundColor: '#85BB2F' }]} />
                    <View style={[styles.nutriScoreSegment, { backgroundColor: '#FECB02' }]} />
                    <View style={[styles.nutriScoreSegment, { backgroundColor: '#EF8200' }]} />
                    <View style={[styles.nutriScoreSegment, { backgroundColor: '#E63E11' }]} />
                  </View>
                  <View style={styles.newCalculationBadge}>
                    <Text style={styles.newCalculationText}>NEW CALCULATION</Text>
                  </View>
                </View>
              </View>
              <View style={styles.nutritionTextContainer}>
                <Text style={[styles.nutritionTitle, { color: getNutriScoreColor(product.nutriscore_grade) }]}>
                  Nutri-Score {product.nutriscore_grade?.toUpperCase() || 'C'}
                </Text>
                <Text style={[styles.nutritionDescription, { color: themeStyles.secondaryText }]}>
                  {getNutriScoreDescription(product.nutriscore_grade)}
                </Text>
              </View>
            </View>

            {/* NOVA Group Card */}
            <View style={[styles.nutritionCard, { backgroundColor: themeStyles.card, borderWidth: 0.2, borderColor: '#FFFFFF' }]}>
              <View style={styles.nutritionIconContainer}>
                <View style={styles.novaIconContainer}>
                  <Text style={styles.novaText}>NOVA</Text>
                  <View style={styles.novaSquare}>
                    <Text style={styles.novaNumber}>{product.nova_group || '3'}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.nutritionTextContainer}>
                <Text style={[styles.nutritionTitle, { color: getNovaGroupColor(product.nova_group) }]}>
                  {getNovaGroupDescription(product.nova_group)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}> 
      {/* Custom back button - outside ScrollView */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 60,
          left: 16,
          zIndex: 9999,
          padding: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 20,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
      {renderContent()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.scanAgainButton, { backgroundColor: themeStyles.add }]}
          onPress={() => navigation.navigate('Scanner')}
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
  nutritionContainer: {
    flexDirection: 'column',
    marginTop: 15,
    padding: 10,
  },
  nutritionCard: {
    borderRadius: 0.15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nutritionIconContainer: {
    width: 100,
    alignItems: 'center',
    marginRight: 15,
  },
  nutriScoreIcon: {
    width: 90,
    height: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  nutriScoreText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 6,
  },
  nutriScoreBar: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
  },
  nutriScoreSegment: {
    flex: 1,
    height: '100%',
  },
  newCalculationBadge: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  newCalculationText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  nutritionTextContainer: {
    flex: 1,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nutritionDescription: {
    fontSize: 14,
  },
  novaIconContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  novaText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 4,
  },
  novaSquare: {
    width: 60,
    height: 60,
    backgroundColor: '#E63E11',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  novaNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ResultScreen; 