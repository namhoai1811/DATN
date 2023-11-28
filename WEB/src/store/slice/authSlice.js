import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { storage } from "../../service/storage";

const initialState = {
    loading: false,
    code: 200,
    message: "",
    user: {
        firstName: "",
        lastName: "",
        role: "",
        phoneNumber: "",
    },
};

export const login = createAsyncThunk(
    "auth/login",
    async (params, thunkAPI) => {
        const data = {
            username: params.phoneNumber,
            password: params.password,
        };
        try {
            const res = await axiosClient("post", "/api/v1/auth/login", data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (params, thunkAPI) => {
        const data = {
            username: params.phoneNumber,
            password: params.password,
            firstName: params.firstName,
            lastName: params.lastName,
        };
        try {
            const res = await axiosClient(
                "post",
                "/api/v1/auth/register",
                data
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getInfoUser = createAsyncThunk(
    "auth/getInfo",
    async (params, thunkAPI) => {
        try {
            const res = await axiosClient("get", "api/v1/auth/info");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const logout = () => {
    storage.removeItem("token");
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                storage.setItem("token", action.payload.data.token);
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
            })
            .addCase(getInfoUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getInfoUser.rejected, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
            })
            .addCase(getInfoUser.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.user.firstName = action.payload.data.firstName;
                state.user.lastName = action.payload.data.lastName;
                state.user.username = action.payload.data.username;
                state.user.role = action.payload.data.role;
            });
    },
});

export default authSlice.reducer;
