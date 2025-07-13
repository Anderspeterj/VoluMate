# VoluMate Backend

A Java Spring Boot backend for the VoluMate food scanning application. This backend provides secure API access to product data and Volume Serenity Score calculations.

## Features

- 🔒 **Secure API Proxy** for OpenFoodFacts API
- 🧮 **Volume Serenity Score Calculation** - Health scoring algorithm
- ⚡ **Caching** - Reduces API calls and improves performance
- 🔄 **Retry Logic** - Handles network failures gracefully
- 🧪 **Comprehensive Testing** - Unit tests for all core functionality
- 📊 **Logging** - Detailed logging for debugging and monitoring

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring WebFlux** - Reactive HTTP client
- **Maven** - Dependency management
- **JUnit 5** - Testing framework
- **Lombok** - Reduces boilerplate code

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Quick Start

### 1. Clone and Navigate
```bash
cd backend
```

### 2. Build the Project
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Get Product by Barcode
```
GET /api/products/{barcode}
```

**Parameters:**
- `barcode` (path parameter): 8-13 digit product barcode

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "barcode": "3017620422003",
    "productName": "Nutella",
    "categories": "spreads,breakfasts",
    "imageUrl": "https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.50.400.jpg",
    "volumeSerenityScore": 2,
    "volumeSerenityRating": "Consider a Healthier Option",
    "volumeSerenityRatingColor": "#F44336"
  },
  "error": null
}
```

### Health Check
```
GET /api/products/health
```

**Response:**
```json
{
  "success": true,
  "message": "Service is running",
  "data": "VoluMate Backend is healthy",
  "error": null
}
```

## Configuration

The application is configured via `application.yml`:

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

external:
  openfoodfacts:
    base-url: https://world.openfoodfacts.org/api/v2
    timeout: 10000
    retry-attempts: 3

cache:
  product:
    ttl: 3600
    max-size: 1000

security:
  cors:
    allowed-origins: "*"
    allowed-methods: "GET,POST,PUT,DELETE,OPTIONS"
    allowed-headers: "*"
```

## Volume Serenity Score Algorithm

The scoring algorithm analyzes product names and categories to determine healthiness:

### Good Keywords (+2 points each)
- oat, rye, bread, vegetable, fruit, water, milk
- yogurt, cheese, egg, chicken, fish, nuts
- lentil, bean, legume, whole grain, organic, natural, fresh

### Bad Keywords (-3 points each)
- candy, chocolate, chips, crisps, soda, sugar, sweet
- cake, biscuit, cookie, ice-cream, pizza, burger
- processed, artificial, preservative, high fructose, trans fat

### Score Ranges
- **8-10**: Excellent Choice! (Green)
- **6-7**: Good Choice (Light Green)
- **4-5**: Okay (Orange)
- **0-3**: Consider a Healthier Option (Red)

## Testing

Run all tests:
```bash
mvn test
```

Run specific test class:
```bash
mvn test -Dtest=VolumeSerenityScoreServiceTest
```

## Development

### Project Structure
```
src/
├── main/
│   ├── java/com/volumate/
│   │   ├── controller/     # REST API endpoints
│   │   ├── service/        # Business logic
│   │   ├── model/          # Data models
│   │   └── config/         # Configuration classes
│   └── resources/
│       └── application.yml # Application configuration
└── test/
    └── java/com/volumate/
        └── service/        # Unit tests
```

### Adding New Features

1. **New API Endpoint**: Add controller method in `ProductController`
2. **Business Logic**: Create service class in `service` package
3. **Data Models**: Add model classes in `model` package
4. **Tests**: Write unit tests in `test` package

## Security Considerations

- Input validation on all endpoints
- CORS configuration for cross-origin requests
- Rate limiting (can be added with Spring Security)
- API key management for external services
- Proper error handling without exposing sensitive information

## Performance Optimizations

- **Caching**: Product data cached for 1 hour
- **Reactive Programming**: Non-blocking I/O with WebFlux
- **Connection Pooling**: Efficient HTTP client configuration
- **Retry Logic**: Automatic retry on network failures

## Deployment

### Docker (Optional)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/volumate-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Production Considerations
- Configure proper CORS origins
- Set up monitoring and logging
- Use environment variables for sensitive configuration
- Implement rate limiting
- Add authentication if needed

## Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `application.yml`
2. **API timeouts**: Increase timeout value in configuration
3. **CORS errors**: Check CORS configuration for your frontend domain

### Logs
Application logs are available in the console with DEBUG level for development.

## Contributing

1. Follow Java coding conventions
2. Write unit tests for new features
3. Update documentation
4. Use meaningful commit messages

## License

This project is part of the VoluMate application. 