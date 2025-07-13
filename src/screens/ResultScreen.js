import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
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
    navigation.setOptions({ title: 'Scan Result' });
    const fetchProduct = async () => {
      try {
        // Check if product is already in our DB
        const existingProduct = await getProductByBarcode(barcode);
        if(existingProduct) {
            setIsSaved(true);
        }

        const productData = await apiClient.getProductByBarcode(barcode);
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
  
  const handleSave = async () => {
    const productToSave = {
      barcode,
      name: product.productName,
      image_url: product.imageUrl,
      score,
      rating,
      rating_color: ratingColor,
    };
    await saveProduct(productToSave);
    setIsSaved(true);
  };


  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={themeStyles.primary} />
    }
    
    if (error) {
      return <Text style={[styles.errorText, { color: themeStyles.accent }]}>{error}</Text>;
    }

    if (product) {
      return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.card, { backgroundColor: themeStyles.card }]}>
            <Text style={[styles.title, { color: themeStyles.text }]}>{product.displayName || 'No product name'}</Text>
            {product.imageUrl ? (
              <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={{color: themeStyles.secondaryText}}>No Image Available</Text>
              </View>
            )}
             {score !== null && (
              <TouchableOpacity
                onPress={handleSave}
                disabled={isSaved}
                style={[styles.saveButton, { backgroundColor: isSaved ? themeStyles.secondaryText : themeStyles.accent }]}
              >
                <Ionicons name={isSaved ? 'checkmark-done-outline' : 'bookmark-outline'} size={20} color={themeStyles.text} />
                <Text style={styles.saveButtonText}>{isSaved ? 'Saved' : 'Save for Later'}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.card, { backgroundColor: themeStyles.card }]}>
            <Text style={styles.scoreTitle}>Volume Serenity Score</Text>
            {score !== null ? (
              <View style={styles.scoreContainer}>
                <Text style={[styles.score, { color: ratingColor }]}>{score}</Text>
                <Text style={[styles.scoreTotal, { color: themeStyles.secondaryText }]}>/ 10</Text>
              </View>
            ) : null}
            <Text style={[styles.rating, { color: themeStyles.text }]}>{rating}</Text>
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
          <Button title="Scan Another Product" onPress={() => navigation.goBack()} color={themeStyles.primary} />
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
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
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
});

export default ResultScreen; 