import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockProducts } from "@/data/mockData";

const initialState = {
  cartItems: [],
  isLoading: false,
};

// Helper function to get cart from localStorage
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const product = mockProducts.find(p => p._id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    const cart = getCartFromStorage();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        _id: Date.now().toString(),
        productId,
        product,
        quantity,
        userId: userId || 'guest'
      });
    }
    
    saveCartToStorage(cart);
    return { success: true, data: cart };
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const cart = getCartFromStorage();
    return { success: true, data: cart };
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const cart = getCartFromStorage();
    const updatedCart = cart.filter(item => item.productId !== productId);
    saveCartToStorage(updatedCart);
    
    return { success: true, data: updatedCart };
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const cart = getCartFromStorage();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      if (quantity <= 0) {
        const updatedCart = cart.filter(item => item.productId !== productId);
        saveCartToStorage(updatedCart);
        return { success: true, data: updatedCart };
      } else {
        item.quantity = quantity;
        saveCartToStorage(cart);
        return { success: true, data: cart };
      }
    }
    
    return { success: true, data: cart };
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
