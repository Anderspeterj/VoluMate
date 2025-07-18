import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const SatietyIndexScreen = () => {
  const { styles: themeStyles } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeStyles.background }]}>
      <ScrollView 
        style={[styles.container, { backgroundColor: themeStyles.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Text style={[
            styles.title,
            { color: themeStyles.text }
          ]}>
            Hvad er Mæthedsindekset?
          </Text>
          <View style={[styles.divider, { backgroundColor: themeStyles.secondaryText }]} />
          <Text style={[
            styles.infoText,
            { color: themeStyles.secondaryText }
          ]}>
            Mæthedsindekset rangerer fødevarer efter, hvor godt de mætter. Studiet er fra University of Sydney, med hvidt brød som referencepunkt (score = 100).{'\n\n'}
            En score over 100 betyder, at en fødevare er mere mættende end hvidt brød. For eksempel har havregryn en score på 209, mens en croissant kun har 47.{'\n\n'}
            Fødevarer med meget <Text style={{fontWeight: 'bold', color: themeStyles.text}}>protein, fibre og vand</Text> mætter typisk mere. Ved at vælge mad med et højt mæthedsindeks, kan du føle dig mæt i længere tid.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    paddingTop: 75,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SatietyIndexScreen; 