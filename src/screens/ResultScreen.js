import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { saveProduct, getProductByBarcode } from '../utils/database';
import { Ionicons } from '@expo/vector-icons';

const calculateVolumeSerenityScore = (product) => {
  // We need a product with at least a category or a name to score it.
  if (!product || (!product.categories && !product.product_name)) {
    return { score: null, rating: 'Could not determine score.' };
  }

  const categories = product.categories ? product.categories.toLowerCase() : '';
  const productName = product.product_name ? product.product_name.toLowerCase() : '';

  // Simple keyword-based scoring
  const goodKeywords = ['oat', 'rye', 'bread', 'vegetable', 'fruit', 'water', 'milk', 'yogurt', 'cheese', 'egg', 'chicken', 'fish', 'nuts', 'lentil', 'bean', 'legume'];
  const badKeywords = ['candy', 'chocolate', 'chips', 'crisps', 'soda', 'sugar', 'sweet', 'cake', 'biscuit', 'cookie', 'ice-cream', 'pizza', 'burger'];

  let score = 5; // Start with a neutral score of 5/10
  let keywordMatches = 0;

  goodKeywords.forEach(keyword => {
    if (categories.includes(keyword) || productName.includes(keyword)) {
      score += 2;
      keywordMatches++;
    }
  });

  badKeywords.forEach(keyword => {
    if (categories.includes(keyword) || productName.includes(keyword)) {
      score -= 3;
      keywordMatches++;
    }
  });

  // If we didn't find any relevant keywords, we can't reliably score the product.
  if (keywordMatches === 0) {
    return { score: null, rating: 'Could not determine score from available data.' };
  }
  
  score = Math.max(0, Math.min(10, score)); // Clamp score between 0 and 10

  let rating = 'Okay';
  let ratingColor = '#FFA500'; // Orange for neutral
  if (score >= 8) {
    rating = 'Excellent Choice!';
    ratingColor = '#4CAF50'; // Green for good
  } else if (score >= 6) {
    rating = 'Good Choice';
    ratingColor = '#8BC34A'; // Light Green for good-ish
  } else if (score <= 3) {
    rating = 'Consider a Healthier Option';
    ratingColor = '#F44336'; // Red for bad
  }

  return { score: score, rating, ratingColor };
};


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

        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
        const data = await response.json();
        if (data.status === 1 && data.product) {
          setProduct(data.product);
        } else {
          setError('Product not found in the database.');
        }
      } catch (e) {
        setError('Failed to connect to the food database.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode, navigation]);

  const { score, rating, ratingColor } = calculateVolumeSerenityScore(product);
  
  const handleSave = async () => {
    const productToSave = {
      barcode,
      name: product.product_name,
      image_url: product.image_url,
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
            <Text style={[styles.title, { color: themeStyles.text }]}>{product.product_name || 'No product name'}</Text>
            {product.image_url ? (
              <Image source={{ uri: product.image_url }} style={styles.productImage} />
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