// config.js - Centralized configuration for environment variables

const config = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Environment detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // App Configuration
  APP_NAME: 'TaskFlow',
  APP_VERSION: '1.0.0',
  
  // Feature flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
};

// Log configuration in development
if (config.isDevelopment) {
  console.log('🔧 App Configuration:', config);
}

export default config; 