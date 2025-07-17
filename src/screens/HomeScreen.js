import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { styles: themeStyles } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: themeStyles.text }]}>Mæthedsscanner</Text>
          <Text style={[styles.description, { color: themeStyles.secondaryText }]}>
            Scan dine madvarers stregkode og få deres mæthedsscore.{'\n'}
            Jo højere score, jo mere mættende er maden.
          </Text>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={[styles.scanButton, { backgroundColor: themeStyles.primary }]} 
            onPress={() => navigation.navigate('Scanner')}
          >
            <Ionicons name="barcode-outline" size={32} color={themeStyles.text} />
            <Text style={[styles.scanButtonText, { color: themeStyles.text }]}>Scan via stregkode</Text>
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
  },
  headerSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '25%',
  },
  buttonSection: {
    paddingBottom: '5%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 10,
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