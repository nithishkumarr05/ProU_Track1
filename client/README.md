# Sri Raja Food Products - Frontend Only

This is a fully functional responsive frontend application for Sri Raja Food Products, converted to work without backend dependencies.

## Features

- **Home Page**: Beautiful landing page with hero section, product categories, testimonials, and featured products
- **Product Listing**: Browse and filter products by category and type
- **Shopping Cart**: Add/remove products, update quantities using localStorage
- **Product Details**: View detailed product information
- **Grinding Bookings**: Book grinding services (mock functionality)
- **Account Page**: User account management (mock functionality)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- React 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Framer Motion for animations

## Mock Data

The application uses mock JSON data stored in `src/data/mockData.js` including:
- 10 sample products (oils, seeds, nuts, jaggery, ghee)
- Product categories
- Feature images for hero carousel
- Customer testimonials
- Sample cart items and user data

## Key Changes Made

1. **Removed Authentication**: No login/register required - all pages accessible
2. **Mock Data**: Replaced all API calls with mock data
3. **Local Storage**: Cart functionality uses browser localStorage
4. **Simplified Routing**: Direct access to all pages without auth checks
5. **Responsive Design**: Mobile-first approach with Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── store/              # Redux store and slices
├── data/               # Mock data
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Features Working

✅ Home page with hero carousel
✅ Product listing with filters
✅ Shopping cart functionality
✅ Product details modal
✅ Responsive navigation
✅ Category browsing
✅ Search functionality
✅ Grinding bookings (mock)
✅ Account page (mock)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The application is built with Vite for fast development and hot reloading. All components are fully functional with mock data, providing a complete user experience without requiring a backend server.