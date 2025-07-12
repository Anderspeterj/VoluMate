import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ThemeContext } from '../contexts/ThemeContext';

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
        <Button onPress={requestPermission} title="Grant Permission" color={themeStyles.primary} />
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
      {scanned && (
        <Button
          title={'Tap to Scan Again'}
          onPress={() => setScanned(false)}
          color={themeStyles.primary}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
}); 