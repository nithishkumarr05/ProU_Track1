import { useEffect } from 'react';

// Simplified TokenRefresher for frontend-only application
const TokenRefresher = () => {
  useEffect(() => {
    // No token refresh needed for frontend-only application
    console.log('TokenRefresher: Frontend-only mode - no token refresh needed');
  }, []);

  // No UI - this is just a background process
  return null;
};

export default TokenRefresher; 