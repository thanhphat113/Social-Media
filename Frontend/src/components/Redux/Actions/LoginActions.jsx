import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const login = createAsyncThunk(
    "user/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://localhost:5164/api/Login",
                { email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(false);
        }
    }
);

const logout = createAsyncThunk(
    "user/logout",
    async (thunkAPI) => {
        try {
            const response = await axios.get(
                "http://localhost:5164/api/Login/logout",
                { withCredentials: true }
            );
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(false);
        }
    }
);


export { login, logout}; 