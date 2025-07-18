import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { styles: themeStyles, theme } = useContext(ThemeContext);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    navigation.navigate('Result', { barcode: data });
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, { backgroundColor: themeStyles.background, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Text style={{ color: themeStyles.text, marginBottom: 20, fontSize: 18, textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity 
          style={[styles.scanButton, { backgroundColor: themeStyles.primary }]}
          onPress={requestPermission}
        >
          <Ionicons name="camera-outline" size={32} color={themeStyles.text} />
          <Text style={[styles.scanButtonText, { color: themeStyles.text }]}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            'aztec',
            'ean13',
            'ean8',
            'qr',
            'pdf417',
            'upc_e',
            'datamatrix',
            'code39',
            'code93',
            'itf14',
            'codabar',
            'code128',
            'upc_a',
          ],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={32} color={themeStyles.text} />
        <Text style={[styles.backButtonText, { color: themeStyles.text }]}>Tilbage</Text>
      </TouchableOpacity>
      {scanned && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.scanButton, { backgroundColor: themeStyles.primary }]}
            onPress={() => setScanned(false)}
          >
            <Ionicons name="barcode-outline" size={32} color={themeStyles.text} />
            <Text style={[styles.scanButtonText, { color: themeStyles.text }]}>Tryk for at scanne igen</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
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
    width: '100%',
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
}); 