import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const ContactScreen = () => {
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
            Beta Test Feedback
          </Text>
          <Text style={[
            styles.description,
            { color: themeStyles.text }
          ]}>
            Vi er i beta-testning og har brug for din hjælp til at forbedre vores mæthedsscore-system.
          </Text>
          <Text style={[
            styles.contactInfo,
            { color: themeStyles.text }
          ]}>
            Hvis du finder et produkt hvor:
            {'\n\n'}• Der mangler en mæthedsscore
            {'\n'}• Mæthedsscoren virker forkert (f.eks. hvis Nutella får en høj score)
            {'\n'}• Du oplever andre problemer med scoringen
            {'\n\n'}Så send venligst en mail til:
          </Text>
          <Text style={[
            styles.email,
            { color: themeStyles.primary }
          ]}>
            anderspeterj0796@gmail.com
          </Text>
          <Text style={[
            styles.thankYou,
            { color: themeStyles.text }
          ]}>
            Tak for din hjælp med at forbedre appen!
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
    paddingTop: 100, // Tilføjer ekstra padding i toppen
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  thankYou: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ContactScreen;

