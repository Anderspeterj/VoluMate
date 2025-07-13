# VoluMate Setup Guide

This guide will help you set up the complete VoluMate application with the new Java backend and updated React Native frontend.

## 🏗️ Architecture Overview

```
React Native App (Frontend + SQLite)
    ↓ HTTP/HTTPS
Java Spring Boot Backend
    ↓ API Calls
OpenFoodFacts API
```

## 📋 Prerequisites

### For Java Backend
- **Java 17** or higher
- **Maven 3.6** or higher

### For React Native Frontend
- **Node.js** 16 or higher
- **Expo CLI** (install with `npm install -g @expo/cli`)

## 🚀 Quick Setup

### Step 1: Set Up Java Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Start the backend server:**
   
   **Windows:**
   ```bash
   start.bat
   ```
   
   **Mac/Linux:**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
   
   **Manual:**
   ```bash
   mvn spring-boot:run
   ```

3. **Verify backend is running:**
   - Open browser to: `http://localhost:8080/api/products/health`
   - You should see: `{"success":true,"message":"Service is running","data":"VoluMate Backend is healthy","error":null}`

### Step 2: Update Frontend Configuration

1. **Navigate to frontend directory:**
   ```bash
   cd ..  # Go back to root
   ```

2. **Update API URL (if needed):**
   - Open `src/utils/api.js`
   - Change `API_BASE_URL` if your backend runs on a different port or host

3. **Start the React Native app:**
   ```bash
   npm start
   ```

## 🔧 Detailed Setup

### Java Backend Setup

#### Install Java 17
- **Windows:** Download from [Oracle](https://www.oracle.com/java/technologies/downloads/#java17) or use [AdoptOpenJDK](https://adoptopenjdk.net/)
- **Mac:** `brew install openjdk@17`
- **Linux:** `sudo apt install openjdk-17-jdk` (Ubuntu/Debian)

#### Install Maven
- **Windows:** Download from [Maven website](https://maven.apache.org/download.cgi)
- **Mac:** `brew install maven`
- **Linux:** `sudo apt install maven` (Ubuntu/Debian)

#### Verify Installation
```bash
java -version
mvn -version
```

### React Native Setup

#### Install Expo CLI
```bash
npm install -g @expo/cli
```

#### Install Dependencies
```bash
npm install
```

## 🧪 Testing the Setup

### Test Backend API
```bash
# Test health endpoint
curl http://localhost:8080/api/products/health

# Test product lookup (replace with real barcode)
curl http://localhost:8080/api/products/3017620422003
```

### Test Frontend
1. Start the React Native app: `npm start`
2. Scan a product barcode
3. Verify the score calculation works

## 🔍 Troubleshooting

### Backend Issues

**Port 8080 already in use:**
- Change port in `backend/src/main/resources/application.yml`
- Update `API_BASE_URL` in frontend accordingly

**Java not found:**
- Ensure Java 17+ is installed and in PATH
- Restart terminal after installation

**Maven not found:**
- Ensure Maven is installed and in PATH
- Restart terminal after installation

### Frontend Issues

**Cannot connect to backend:**
- Ensure backend is running on correct port
- Check `API_BASE_URL` in `src/utils/api.js`
- Verify CORS settings in backend

**App crashes on scan:**
- Check backend logs for errors
- Verify API response format matches expected structure

## 📊 What's New

### Backend Features
- ✅ **Secure API Proxy** - Handles OpenFoodFacts API calls
- ✅ **Volume Serenity Score Calculation** - Moved from JavaScript to Java
- ✅ **Caching** - Reduces API calls and improves performance
- ✅ **Retry Logic** - Handles network failures gracefully
- ✅ **Input Validation** - Validates barcode format
- ✅ **Error Handling** - Proper error responses
- ✅ **Logging** - Detailed logs for debugging

### Frontend Changes
- ✅ **API Integration** - Now calls Java backend instead of OpenFoodFacts directly
- ✅ **Simplified Code** - Removed client-side score calculation
- ✅ **Better Error Handling** - Improved error messages
- ✅ **Consistent Data Format** - Standardized API responses

## 🔒 Security Improvements

- **Input Validation** - Barcode format validation
- **API Proxy** - No direct external API calls from frontend
- **Error Handling** - No sensitive information in error messages
- **CORS Configuration** - Proper cross-origin request handling

## 📈 Performance Benefits

- **Caching** - Product data cached for 1 hour
- **Reduced API Calls** - Backend handles external API communication
- **Reactive Programming** - Non-blocking I/O with WebFlux
- **Connection Pooling** - Efficient HTTP client configuration

## 🎯 Next Steps

1. **Test thoroughly** with various product barcodes
2. **Monitor performance** and adjust cache settings if needed
3. **Add authentication** if required for production
4. **Deploy backend** to cloud service (Heroku, AWS, etc.)
5. **Update frontend** to use production backend URL

## 📞 Support

If you encounter issues:
1. Check the logs in both backend and frontend
2. Verify all prerequisites are installed
3. Ensure ports are not blocked by firewall
4. Test API endpoints manually with curl or Postman

## 🎉 Congratulations!

You now have a fully functional VoluMate application with:
- **Java backend** for security and performance
- **React Native frontend** with SQLite for local storage
- **Volume Serenity Score** calculation on the server
- **Caching and retry logic** for reliability

Happy coding! 🚀 