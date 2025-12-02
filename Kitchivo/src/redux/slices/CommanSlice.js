
//@ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";
import CommanServices from "../../services/CommanService";

export const getDashboard = createAsyncThunk(
    "auth/getDashboard",
    async () => {
        try {
            const res = await CommanServices.getDashboard();
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateUserProfileThunk = createAsyncThunk(
    "auth/updateUserProfile",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await CommanServices.updateUserProfile(formData);
            return res;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

export const getSystemSettings = createAsyncThunk(
    "auth/getSystemSettings",
    async () => {
        try {
            const res = await CommanServices.getSystemSettings();
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getWishlist = createAsyncThunk(
    "auth/getWishlist",
    async () => {
        try {
            const res = await CommanServices.getWishlist();
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const removeWishlist = createAsyncThunk(
    "auth/removeWishlist",
    async (data) => {
        try {
            const res = await CommanServices.removeWishlist(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchProductDetails = createAsyncThunk(
    "auth/fetchProductDetails",
    async (data) => {
        try {
            const res = await CommanServices.getProductDetails(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchAllProducts = createAsyncThunk(
    "auth/fetchAllProducts",
    async (data, { rejectWithValue }) => {
        try {
            const res = await CommanServices.getAllProducts(data);
            return res;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

export const fetchAllProductsByCategory = createAsyncThunk(
    "auth/fetchAllProductsByCategory",
    async (data, { rejectWithValue }) => {
        try {
            const res = await CommanServices.getAllProductsByCategory(data);
            return res;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

export const createContact = createAsyncThunk(
    "auth/createContact",
    async (data) => {
        try {
            const res = await CommanServices.createContact(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const createWishlist = createAsyncThunk(
    "auth/createWishlist",
    async (data,thunkAPI) => {
        try {
            const res = await CommanServices.createWishlist(data);
            // if (res.status == 1) {
            //     thunkAPI.dispatch(getDashboard());
            // }
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const submitReview = createAsyncThunk(
    "auth/submitReview",
    async (data, { rejectWithValue }) => {
        try {
            const res = await CommanServices.submitReview(data);
            return res;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

export const searchProducts = createAsyncThunk(
    "auth/searchProducts",
    async (searchTerm, { rejectWithValue }) => {
        try {
            const res = await CommanServices.searchProducts(searchTerm);
            return res;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);

const initialState = {
    loading: false,
    error: false,
    dashboard: null,
    products: [],
    productDatails:null,
    pagination: null,
    wishlist:null,
    searchResults: null,
    searchLoading: false,
    systemSettings: null,
    profile: null,
    updateProfileLoading: false,
    updateProfileError: null,
    categoryProducts: {
        category: null,
        products: [],
        pagination: {
            total_records: 0,
            total_pages: 0,
            current_page: 1,
        },
        filters: {
            category_id: null,
            page: 1,
            priceRange: "",
            sortBy: "",
            search: "",
        },
    },
};

const CommanSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearSearchResults(state) {
            state.searchResults = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboard.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.dashboard = payload?.data;
            })
            .addCase(getDashboard.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(getSystemSettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSystemSettings.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.systemSettings = payload?.data;
            })
            .addCase(getSystemSettings.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWishlist.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.wishlist = payload?.data;
            })
            .addCase(getWishlist.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(removeWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeWishlist.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeWishlist.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(createContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(createContact.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createContact.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchProductDetails.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = false;
                state.productDatails = payload?.data;
            })
            .addCase(fetchProductDetails.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload || true;
            });
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = false;
                state.products = payload?.data;
                state.pagination = payload?.pagination || null;
            })
            .addCase(fetchAllProducts.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload || true;
            });
        builder
            .addCase(fetchAllProductsByCategory.pending, (state, { meta }) => {
                state.loading = true;
                state.error = false;
                if (meta && meta.arg) {
                    state.categoryProducts.filters = {
                        ...state.categoryProducts.filters,
                        ...meta.arg,
                    };
                }
            })
            .addCase(fetchAllProductsByCategory.fulfilled, (state, { payload, meta }) => {
                state.loading = false;
                state.error = false;
                state.categoryProducts.category = payload?.data?.category || null;
                state.categoryProducts.products = payload?.data?.products || [];
                state.categoryProducts.pagination = {
                    total_records: payload?.total_records || 0,
                    total_pages: payload?.total_pages || 0,
                    current_page: payload?.current_page || 1,
                };
                if (meta && meta.arg) {
                    state.categoryProducts.filters = {
                        ...state.categoryProducts.filters,
                        ...meta.arg,
                    };
                }
            })
            .addCase(fetchAllProductsByCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload || true;
            });
        builder
            .addCase(searchProducts.pending, (state) => {
                state.searchLoading = true;
            })
            .addCase(searchProducts.fulfilled, (state, { payload }) => {
                state.searchLoading = false;
                state.searchResults = payload || null;
            })
            .addCase(searchProducts.rejected, (state) => {
                state.searchLoading = false;
                state.searchResults = null;
            });
        builder
            .addCase(submitReview.pending, (state) => {
                state.error = false;
            })
            .addCase(submitReview.fulfilled, (state) => {
                state.error = false;
            })
            .addCase(submitReview.rejected, (state, { payload }) => {
                state.error = payload || true;
            });
        builder
            .addCase(updateUserProfileThunk.pending, (state) => {
                state.updateProfileLoading = true;
                state.updateProfileError = null;
            })
            .addCase(updateUserProfileThunk.fulfilled, (state, { payload }) => {
                state.updateProfileLoading = false;
                state.updateProfileError = null;
                state.profile = payload?.data || null;
            })
            .addCase(updateUserProfileThunk.rejected, (state, { payload }) => {
                state.updateProfileLoading = false;
                state.updateProfileError = payload || true;
            });
    },
});

export const { clearSearchResults } = CommanSlice.actions;

export default CommanSlice.reducer;