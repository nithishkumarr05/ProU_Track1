export const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

export const makeAuthenticatedRequest = async (url, method = 'GET', data = null) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`Mock ${method} request to ${url}`, {
    url,
    method,
    data: data ? JSON.stringify(data).substring(0, 100) : 'none'
  });
  
  return { success: true, message: 'Mock API response' };
};

export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatHumanReadableDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const fetchAllReviewsForAdmin = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      _id: "1",
      userName: "John Doe",
      comment: "Great product!",
      rating: 5,
      productName: "Coconut Oil",
      createdAt: new Date()
    },
    {
      _id: "2", 
      userName: "Jane Smith",
      comment: "Excellent quality",
      rating: 4,
      productName: "Groundnut Oil",
      createdAt: new Date()
    }
  ];
};