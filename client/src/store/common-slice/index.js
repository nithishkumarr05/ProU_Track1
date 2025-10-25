import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockFeatureImages, mockCategories } from "@/data/mockData";

const initialState = {
  isLoading: false,
  featureImageList: [],
  categories: [],
  error: null,
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, data: mockFeatureImages };
    } catch (error) {
      console.error("Error fetching feature images:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to fetch feature images" });
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, data: { ...image, _id: Date.now().toString() } };
    } catch (error) {
      console.error("Error adding feature image:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to add feature image" });
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data || [];
        state.categories = mockCategories;
        state.error = null;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
        state.error = action.payload || { message: "Unknown error occurred" };
      })
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "Unknown error occurred" };
      });
  },
});

export const { clearErrors } = commonSlice.actions;
export default commonSlice.reducer;
