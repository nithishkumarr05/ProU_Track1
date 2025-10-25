import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockProducts } from "@/data/mockData";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredProducts = [...mockProducts];
    
    // Apply filters
    if (filterParams.category && filterParams.category.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filterParams.category.includes(product.category)
      );
    }
    
    if (filterParams.brand && filterParams.brand.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filterParams.brand.includes(product.brand)
      );
    }
    
    if (filterParams.featured && filterParams.featured.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filterParams.featured.includes(product.featured.toString())
      );
    }
    
    if (filterParams.priceRange && filterParams.priceRange.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.salePrice || product.price;
        return filterParams.priceRange.some(range => {
          switch (range) {
            case "0-200":
              return price < 200;
            case "200-500":
              return price >= 200 && price < 500;
            case "500-1000":
              return price >= 500 && price < 1000;
            case "1000+":
              return price >= 1000;
            default:
              return true;
          }
        });
      });
    }
    
    // Apply sorting
    if (sortParams === "price-lowtohigh") {
      filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortParams === "price-hightolow") {
      filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortParams === "title-atoz") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortParams === "title-ztoa") {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return { success: true, data: filteredProducts };
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const product = mockProducts.find(p => p._id === id);
    return { success: true, data: product || null };
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
