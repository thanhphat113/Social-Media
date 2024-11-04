import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SetUser = createAsyncThunk("User/get", async () => {
    try {
        const response = await axios.get(
			"http://localhost:5164/api/User/findbyid",
			{
				withCredentials: true,
			}
		);
		return response.data;
    } catch {
        return null;
    }
});

const getRequests = createAsyncThunk("User/getRequests", async (userid) => {
    try {
        const response = await axios.get(
			"http://localhost:5164/Request",
			{
				params: {id: userid},
				withCredentials: true,
			}
		);
		return response.data;
    } catch {
        return null;
    }
});

export { SetUser, getRequests }
