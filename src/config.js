

const config = {

  API_URL: import.meta.env.VITE_API_URL,
  

  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  

  APP_NAME: 'TaskFlow',
  APP_VERSION: '1.0.0',
  

  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
};


if (config.isDevelopment) {
  console.log('🔧 App Configuration:', config);
}

export default config; 