// API configuration for VoluMate backend
// Determine base URL based on environment
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://volumate-backend-env.eba-eymn8jjm.eu-north-1.elasticbeanstalk.com/api';

export const apiClient = {
  async getProductByBarcode(barcode) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${barcode}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found in the database.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch product data');
      }
      
      return result.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to connect to the food database.');
    }
  },

  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/health`);
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}; 