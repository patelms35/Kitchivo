
//@ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";

export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async () => {
        try {
            const res = await AuthServices.getProfile();
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const changePasswordThunk = createAsyncThunk(
    "auth/changePassword",
    async (data, { rejectWithValue }) => {
        try {
            const res = await AuthServices.changePassword(data);
            return res;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data || error.message);
        }
    }
);


export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email) => {
        try {
            const res = await AuthServices.forgotPasswordSendOpt(email);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const forgotPasswordToVerifyOtp = createAsyncThunk(
    "auth/forgotPasswordToVerifyOtp",
    async (data) => {
        try {
            const res = await AuthServices.forgotPasswordVerifyOpt(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data) => {
        try {
            const res = await AuthServices.resetPassword(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);


export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (data) => {
        try {
            const res = await AuthServices.verifyOtp(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const resendOtp = createAsyncThunk(
    "auth/resendOtp",
    async (email) => {
        try {
            const res = await AuthServices.resendOtp(email);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);


const initialState = {
    loading: false,
    error: false,
    user: null,
    changePasswordLoading: false,
    changePasswordError: null,
};


const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        //   Get Logged In User

        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload?.data;
            })
            .addCase(getProfile.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(forgotPasswordToVerifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgotPasswordToVerifyOtp.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(forgotPasswordToVerifyOtp.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.loading = false;
            })
        builder
            .addCase(changePasswordThunk.pending, (state) => {
                state.changePasswordLoading = true;
                state.changePasswordError = null;
            })
            .addCase(changePasswordThunk.fulfilled, (state, { payload }) => {
                state.changePasswordLoading = false;
                state.changePasswordError = null;
            })
            .addCase(changePasswordThunk.rejected, (state, { payload }) => {
                state.changePasswordLoading = false;
                state.changePasswordError = payload || true;
            });
    },
});

export default AuthSlice.reducer;