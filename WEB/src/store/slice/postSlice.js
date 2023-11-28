import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
    listItem: [],
    pageNumber: 0,
    totalPages: 0,
    pageSize: 0,
    item: {},
    listRecommendation: [],
};

export const getAllPost = createAsyncThunk(
    "post/getAllPost",
    async (params, thunkAPI) => {
        try {
            const rest = await axiosClient(
                "get",
                "api/v1/posts",
                {},
                (params = {
                    limit: params.limit,
                    page: params.page,
                })
            );
            return rest.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getPost = createAsyncThunk(
    "post/getPost",
    async (params, thunkAPI) => {
        console.log(params);
        try {
            const rest = await axiosClient("get", `api/v1/posts/${params}`);
            return rest.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getListRecommendation = createAsyncThunk(
    "post/getListRecommendation",
    async (params, thunkAPI) => {
        const data = {
            nNeighbors: 8,
            id: params.id,
            description: params.description,
            square: params.square,
            price: Number(params.price),
            direct: params.direction,
            juridical: params.juridical,
            street: params.street,
            ward: params.ward,
            district: params.district,
            province: params.province,
            bedroom: params.bedroom,
            kitchen: params.kitchen,
            parking: params.parking,
            floor: params.floor,
        };
        try {
            const rest = await axiosClient(
                "post",
                "get-list-similar-estates",
                data,
                {},
                "http://localhost:80"
            );
            return rest.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPost.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
            })
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.listItem = action.payload.data.content;
                state.pageNumber = action.payload.data.pageable.pageNumber;
                state.pageSize = action.payload.data.pageable.pageSize;
                state.totalPages = action.payload.data.totalPages;
            })
            .addCase(getPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.item = action.payload.data;
            })
            .addCase(getListRecommendation.pending, (state) => {
                state.loading = true;
            })
            .addCase(getListRecommendation.fulfilled, (state, action) => {
                state.loading = false;
                state.listRecommendation = action.payload;
            });
    },
});

// export const {  } = postSlice.actions

export default postSlice.reducer;
