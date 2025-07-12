import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { styles: themeStyles } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <Text style={[styles.title, { color: themeStyles.text }]}>Food Scanner</Text>
      <TouchableOpacity 
        style={[styles.scanButton, { backgroundColor: themeStyles.primary }]} 
        onPress={() => navigation.navigate('Scanner')}
      >
        <Ionicons name="barcode-outline" size={32} color={themeStyles.text} />
        <Text style={[styles.scanButtonText, { color: themeStyles.text }]}>Scan a Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  scanButton: {
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
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default HomeScreen; 