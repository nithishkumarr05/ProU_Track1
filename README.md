# Sri Raja Food Products - E-commerce Frontend

A modern, responsive e-commerce frontend application for Food Products, featuring traditional cold-pressed oils, seeds, nuts, jaggery, and ghee products. This is a frontend-only application built with React and modern web technologies.

## Live Demo

video : https://drive.google.com/file/d/163UaZn17DbR1An51w42Ppc2NC7y38N_s/view?usp=sharing



## 🛠️ Setup Steps

### Prerequisites

- Node.js (v18.16.1 or higher)
- npm (v9.5.1 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Raja_oils
   ```

2. **Navigate to the client directory**
   ```bash
   cd client
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` - the app will automatically redirect to `http://localhost:5173/shop/home`

## 🛠️ Tech Stack

### Frontend Technologies
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management with RTK Query
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### UI Components & Libraries
- **Lucide React** - Beautiful icon library
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications



##  Features

### Core E-commerce Features
- **Homepage** - Hero section with featured products and testimonials
- **Product Catalog** - Browse products with categories and filters
- **Advanced Search** - Search products by name, description, category, type, and brand
- **Shopping Cart** - Add/remove items with quantity management
- **Multi-step Checkout** - Complete checkout process with validation
- **Invoice Generation** - Downloadable PDF invoices after purchase
- **User Account** - Account management and order history
- **Grinding Service Booking** - Book traditional oil grinding services

### Advanced UI Features
- **Dark/Light Mode** - Toggle between themes
- **Wishlist** - Save favorite products
- **Responsive Design** - Mobile-first responsive layout
- **Loading States** - Smooth loading animations
- **Interactive Demos** - Product demonstration components
- **Cart Notifications** - Popup notifications for cart actions

### Technical Features
- **Mock Data System** - Complete frontend-only data management
- **Local Storage** - Persistent cart and user data
- **Type Safety** - PropTypes and error boundaries
- **Performance Optimized** - Lazy loading and code splitting
- **Error Handling** - Comprehensive error boundaries and fallbacks

##Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── common/           # Shared components
│   │   ├── shopping-view/    # Shopping-specific components
│   │   └── ui/              # Reusable UI components
│   ├── pages/
│   │   ├── shopping-view/   # Shopping pages
│   │   └── not-found/       # 404 page
│   ├── store/
│   │   ├── shop/           # Shopping-related Redux slices
│   │   └── auth-slice/     # Authentication slice
│   ├── data/
│   │   └── mockData.js     # Mock data for frontend-only operation
│   ├── lib/
│   │   ├── utils.js        # Utility functions
│   │   └── api-helper.js   # API helper functions
│   ├── contexts/
│   │   └── ThemeContext.js # Theme management
│   └── hooks/
│       └── useToast.js     # Custom toast hook
├── public/
│   └── assets/            # Static assets
└── package.json
```

### Homepage
- **Hero Section**: Beautiful banner with call-to-action
- **Featured Products**: Showcase of premium products
- **Testimonials**: Customer reviews and ratings
- **Categories**: Quick access to product categories

### Product Listing
- **Filter Sidebar**: Category, brand, price range, and featured filters
- **Sort Options**: Price and name sorting
- **Product Grid**: Responsive product cards with images
- **Search Integration**: Real-time search functionality

### Shopping Cart
- **Cart Sidebar**: Slide-out cart with item management
- **Quantity Controls**: Increase/decrease item quantities
- **Price Calculation**: Real-time total calculation
- **Cart Notifications**: Popup notifications for cart actions

### Checkout Process
- **Multi-step Form**: 4-step checkout process
- **Order Review**: Review items before payment
- **Shipping Information**: Delivery address form
- **Payment Methods**: Card, UPI, and Cash on Delivery options
- **Order Confirmation**: Success page with invoice generation

### Additional Pages
- **Account Page**: User profile and order history
- **Grinding Bookings**: Service booking and history
- **Search Results**: Advanced search with filters
- **Product Details**: Detailed product information

## Bonus Features

### Advanced UI Components
1. **Theme Toggle** - Dark/light mode switcher
2. **Wishlist System** - Save and manage favorite products
3. **Product Comparison** - Side-by-side product comparison
4. **Interactive Demos** - Product demonstration components
5. **Advanced Search** - Multi-field search with suggestions
6. **Cart Notifications** - Animated popup notifications
7. **Loading Animations** - Smooth loading states
8. **Responsive Design** - Mobile-first approach

### Technical Enhancements
1. **Mock Data System** - Complete frontend-only data management
2. **Local Storage Integration** - Persistent user data
3. **Error Boundaries** - Comprehensive error handling
4. **Performance Optimization** - Lazy loading and code splitting
5. **Accessibility** - ARIA labels and keyboard navigation
6. **SEO Optimization** - Meta tags and structured data

### User Experience Features
1. **Smooth Animations** - Framer Motion integration
2. **Toast Notifications** - User feedback system
3. **Form Validation** - Real-time form validation
4. **Responsive Images** - Optimized image loading
5. **Progressive Enhancement** - Works without JavaScript

## Assumptions

### Frontend-Only Architecture
- **No Backend Required**: All data is managed through mock data and local storage
- **Mock Authentication**: User authentication is simulated for demo purposes
- **Local Storage**: Cart, wishlist, and user preferences persist in browser storage
- **Static Assets**: All images and assets are served from the public directory

products
- **Grinding Service**: Traditional oil grinding service booking system


### Technical Assumptions
- **Modern Browser Support**: ES6+ features and modern CSS
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessibility**: Basic accessibility features implemented

## Getting Started

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

4. **Explore Features**
   - Browse products on the homepage
   - Use filters and search on the listing page
   - Add items to cart and proceed to checkout
   - Book grinding services
   - Toggle dark/light mode
   - Use wishlist and comparison features

## Notes

- This is a **frontend-only** application designed for demonstration purposes
- All data is managed through mock data and local storage
- The application is optimized for modern browsers
- Responsive design works on mobile, tablet, and desktop devices
- All features are fully functional without requiring a backend server


