import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GetPostsFromUser = createAsyncThunk("User/getPost", async () => {
    try {
        const response = await axios.get(
            `http://localhost:5164/api/Post/by-user`,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
});

export { GetPostsFromUser }