import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../contexts/ThemeContext';
import { getSavedProducts, deleteProduct } from '../utils/database';
import { Ionicons } from '@expo/vector-icons';

const SavedScreen = ({ navigation }) => {
  const { styles: themeStyles } = useContext(ThemeContext);
  const [savedProducts, setSavedProducts] = useState([]);
  const isFocused = useIsFocused();

  const loadProducts = async () => {
    const products = await getSavedProducts();
    setSavedProducts(products);
  };

  useEffect(() => {
    if (isFocused) {
      loadProducts();
    }
  }, [isFocused]);

  const handleDelete = (barcode) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async () => {
            await deleteProduct(barcode);
            loadProducts(); // Refresh the list
        }},
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: themeStyles.card }]}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.productImage} />
      ) : (
        <View style={[styles.productImage, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#757575', fontSize: 12 }}>No Image</Text>
        </View>
      )}
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: themeStyles.text }]} numberOfLines={2}>{item.name}</Text>
        <Text style={[styles.productScore, { color: item.rating_color || '#B0B0B0' }]}>{item.score !== null ? `${item.score}/100` : 'No score'}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.barcode)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color={themeStyles.delete} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <View style={[styles.headerContainer, { backgroundColor: themeStyles.background }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={themeStyles.text}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeStyles.text,  }] }>
          Gemte Produkter
        </Text>
      </View>
      {savedProducts.length > 0 ? (
        <FlatList
          data={savedProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.barcode}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
            <Text style={{color: themeStyles.secondaryText}}>You haven't saved any products yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 60,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        zIndex: 1, // Ensure header stays above list
        elevation: 1, // For Android
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        
    },
    list: {
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        padding: 16,
        marginVertical: 6,
        marginBottom: 10,
        borderWidth: 0.2,
        borderColor: '#e9edf0',
    },
    productImage: {
        width: 30,
        height: 60,
        borderRadius: 8,
        marginRight: 25,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productScore: {
        fontSize: 14,
        marginTop: 5,
    },
    deleteButton: {
        padding: 5,
        color: '#bc0116',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 12,
    },
    fab: {
      position: 'absolute',
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      right: 20,
      bottom: 20,
      borderRadius: 28,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
});

export default SavedScreen; 