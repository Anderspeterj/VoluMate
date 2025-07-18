import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { styles: themeStyles } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={[styles.title, { color: themeStyles.text }]}>Velkommen til VoluMate</Text>
          <Text style={[styles.subtitle, { color: themeStyles.secondaryText }]}>
              Scan dine madvarers stregkode og få deres mæthedsindeks.
          </Text>
        </View>
        <View>
          <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.primary }]} onPress={() => navigation.navigate('Scanner')}>
              <Ionicons name="barcode-outline" size={32} color={themeStyles.text} />
              <Text style={[styles.buttonText, { color: themeStyles.text }]}>Scan en stregkode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.infoButton, { backgroundColor: themeStyles.card }]} onPress={() => navigation.navigate('SatietyIndex')}>
              <Text style={[styles.infoButtonText, { color: themeStyles.text }]}>Hvad er mæthedsindekset?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 80,
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  infoButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 