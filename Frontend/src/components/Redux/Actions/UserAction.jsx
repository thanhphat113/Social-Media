import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GetUserInfo = createAsyncThunk("User/getInfo", async (id) => {
    try {
        const response = await axios.get(
            `http://localhost:5164/api/User/GetUserProfile/${id}`,
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

const SetUser = createAsyncThunk("User/get", async () => {
    try {
        const response = await axios.get(
            "http://localhost:5164/api/User/user-login",
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
        const response = await axios.get("http://localhost:5164/Request", {
            params: { id: userid },
            withCredentials: true,
        });
        return response.data;
    } catch {
        return null;
    }
});

const acceptRequests = createAsyncThunk(
    "User/acceptRequests",
    async (userid) => {
        try {
            const response = await axios.put(
                "http://localhost:5164/Request",
                {},
                {
                    params: { otheruser: userid },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            return response.data;
        } catch {
            return null;
        }
    }
);

const denyRequests = createAsyncThunk("User/denyRequests", async (userid) => {
    try {
        const response = await axios.delete(
            "http://localhost:5164/Request/deny",
            {
                params: { OtherUserId: userid },
                withCredentials: true,
            }
        );
        return response.data;
    } catch {
        return null;
    }
});

const deleteRequests = createAsyncThunk(
    "User/deleteRequests",
    async (notificationId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5164/Request/delete`,
                {
                    params: { id: notificationId },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch {
            return null;
        }
    }
);

const getPostRequests = createAsyncThunk(
    "User/getPostRequests",
    async (userid) => {
        try {
            const response = await axios.get("http://localhost:5164/Request", {
                params: { id: userid },
                withCredentials: true,
            });
            return response.data;
        } catch {
            return null;
        }
    }
);

export {
    SetUser,
    getRequests,
    acceptRequests,
    deleteRequests,
    denyRequests,
    GetUserInfo,
};
