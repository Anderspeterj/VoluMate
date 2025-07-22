import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';


// Add dimension constants
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const FRAME_WIDTH = SCREEN_WIDTH * 0.9; // Make the scanning window wider
const FRAME_HEIGHT = 140; // Make the scanning window taller
const FRAME_TOP = 100; // distance from top
const FRAME_LEFT = (SCREEN_WIDTH - FRAME_WIDTH) / 2;
const FRAME_RIGHT = FRAME_LEFT + FRAME_WIDTH;
const FRAME_BOTTOM = FRAME_TOP + FRAME_HEIGHT;

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const { styles: themeStyles, theme } = useContext(ThemeContext);

  // Reset scanned state when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
    }, [])
  );

  const handleBarCodeScanned = (barcode) => {
    const { data, bounds } = barcode;

    // If bounds are available, filter by frame
    if (bounds && bounds.origin && bounds.size) {
      const centerX = bounds.origin.x + bounds.size.width / 2;
      const centerY = bounds.origin.y + bounds.size.height / 2;

      const insideFrame = centerX >= FRAME_LEFT && centerX <= FRAME_RIGHT &&
                         centerY >= FRAME_TOP  && centerY <= FRAME_BOTTOM;

      if (!insideFrame) {
        return; // Ignore scans outside the frame
      }
    }

    // Accept the scan
    setScanned(true);
    navigation.navigate('Result', { barcode: data });
  };

  const handleManualInput = () => {
    if (manualBarcode.trim().length > 0) {
      setShowManualInput(false);
      setManualBarcode('');
      navigation.navigate('Result', { barcode: manualBarcode.trim() });
    } else {
      Alert.alert('Fejl', 'Indtast venligst en stregkode');
    }
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
      {/* Camera only inside the frame */}
      <View style={[styles.frameContainer, { top: FRAME_TOP, left: FRAME_LEFT, width: FRAME_WIDTH, height: FRAME_HEIGHT }]}> 
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              'aztec','ean13','ean8','qr','pdf417','upc_e','datamatrix','code39','code93','itf14','codabar','code128','upc_a',
            ],
          }}
          style={styles.camera}
          resizeMode="cover"
        />
        {/* dashed border */}
        <View style={[styles.frameBorder, { borderColor: themeStyles.primary }]} pointerEvents="none" />
      </View>

      {/* Overlay UI */}
      <View style={styles.overlayContainer}>
        {/* Masks to dim area outside frame */}
        <View style={[styles.maskTop]} />
        <View style={[styles.maskLeft]} />
        <View style={[styles.maskRight]} />
        <View style={[styles.maskBottom]} />


        {/* Frame */}
        <View style={[styles.frame, { top: FRAME_TOP, width: FRAME_WIDTH, height: FRAME_HEIGHT, borderColor: themeStyles.primary }]}> 
          <TouchableOpacity 
            style={[styles.frameLabel, { backgroundColor: themeStyles.add }]}
            onPress={() => setShowManualInput(true)}
          >
            <Text style={[styles.frameLabelText, { color: themeStyles.text }]}>Indtast stregkode</Text>
          </TouchableOpacity>
        </View>

        {/* Lottie animation between Indtast stregkode and Scan varer */}
        <LottieView
          source={require('../../assets/nemtnavn.json')}
          autoPlay
          loop = {false}
          speed = {1.5}
          style={{ width: 180, height: 180, alignSelf: 'center', marginVertical: 120 }}
        />

        {/* White bordered instruction text */}
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            alignSelf: 'center',
            marginBottom: 30,
            marginTop: -90,
            fontWeight: 'bold',
            fontSize: 28,
            backgroundColor: 'transparent'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
            Start med at scanne dine fødevarer
          </Text>
        </View>

        {/* Arrow & instruction */}
        <Ionicons name="caret-down" size={32} color={themeStyles.text} style={[styles.arrow, { top: FRAME_TOP + FRAME_HEIGHT + 5 }]} />
        <View style={[styles.instructionBox, { top: FRAME_TOP + FRAME_HEIGHT + 50, backgroundColor: themeStyles.background }] }>
          <Text style={[styles.instructionTitle, { color: themeStyles.text }]}>Scan varer</Text>
          <Text style={[styles.instructionText, { color: themeStyles.secondaryText }]}>Placér stregkoden inden for rammen</Text>
        </View>
      </View>

      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={32} color={themeStyles.text} />
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

      {/* Manual Input Modal */}
      <Modal
        visible={showManualInput}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowManualInput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: themeStyles.card }]}>
            <Text style={[styles.modalTitle, { color: themeStyles.text }]}>Indtast Stregkode</Text>
            <TextInput
              style={[styles.barcodeInput, { 
                backgroundColor: themeStyles.background,
                color: themeStyles.text,
                borderColor: '#7e7e7e',
                borderWidth: 0.2
              }]}
              placeholder="Indtast stregkode nummer"
              placeholderTextColor={themeStyles.secondaryText}
              value={manualBarcode}
              onChangeText={setManualBarcode}
              keyboardType="numeric"
              autoFocus={true}
              maxLength={13}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: themeStyles.secondaryText }]}
                onPress={() => {
                  setShowManualInput(false);
                  setManualBarcode('');
                }}
              >
                <Text style={[styles.modalButtonText, { color: themeStyles.text }]}>Annuller</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: (manualBarcode.length === 8 || manualBarcode.length === 12 || manualBarcode.length === 13) ? themeStyles.add : themeStyles.secondaryText }]}
                onPress={handleManualInput}
                disabled={!(manualBarcode.length === 8 || manualBarcode.length === 12 || manualBarcode.length === 13)}
              >
                <Text style={[styles.modalButtonText, { color: themeStyles.text }]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    top: 40,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
  /* --- Overlay styles --- */
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    paddingTop: 100,
  },
  frameContainer: {
    position: 'absolute',
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  frameBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  
  frameLabel: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 65,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  frameLabelText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  arrow: {
    marginTop: 15,
  },
  instructionBox: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 14,
  },
  readyText: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '600',
  },
  readyTextBold: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  basketIcon: {
    marginTop: 20,
  },
  hintText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  mask: {
    position: 'absolute',
    backgroundColor: '#101D25',
    width: '100%',
  },
  /* Dim masks */
  maskTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: FRAME_TOP,
    backgroundColor: '#0d1114',
  },
  maskBottom: {
    position: 'absolute',
    top: FRAME_TOP + FRAME_HEIGHT,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - FRAME_TOP - FRAME_HEIGHT,
    backgroundColor: '#0d1114',
  },
  maskLeft: {
    position: 'absolute',
    top: FRAME_TOP,
    left: 0,
    width: FRAME_LEFT,
    height: FRAME_HEIGHT,
    backgroundColor: '#0d1114',
  },
  maskRight: {
    position: 'absolute',
    top: FRAME_TOP,
    right: 0,
    width: FRAME_LEFT,
    height: FRAME_HEIGHT,
    backgroundColor: '#0d1114',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: -100, // Move modal higher up
    borderWidth: 0.2, // Thin border
    borderColor: '#7e7e7e', // Border color
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  barcodeInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 0.2, // Thin border
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 