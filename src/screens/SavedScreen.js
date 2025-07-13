import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../contexts/ThemeContext';
import { getSavedProducts, deleteProduct } from '../utils/database';
import { Ionicons } from '@expo/vector-icons';

const SavedScreen = () => {
  const { styles: themeStyles } = useContext(ThemeContext);
  const [savedProducts, setSavedProducts] = useState([]);
  const isFocused = useIsFocused();

  const loadProducts = async () => {
    const products = await getSavedProducts();
    setSavedProducts(products);
  };

  useState(() => {
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
        <Text style={[styles.productScore, { color: item.rating_color || '#B0B0B0' }]}>{item.score !== null ? `${item.score}/10` : 'No score'}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.barcode)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color={themeStyles.secondaryText} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <Text style={[styles.title, { color: themeStyles.text }]}>Saved Products</Text>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        padding: 15,
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    list: {
        paddingHorizontal: 15,
        paddingTop: 200,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 0,
        padding: 30,
        marginBottom: 10,
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
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SavedScreen; 