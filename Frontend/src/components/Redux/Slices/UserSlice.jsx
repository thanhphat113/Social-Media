import { createSlice } from "@reduxjs/toolkit";
import {
    GetUserInfo,
    SetUser,
    deleteRequests,
    acceptRequests,
    denyRequests,
} from "../Actions/UserAction";
import {
    addHistory,
    deleteHistory,
    updateHistory,
} from "../Actions/HistorySearchAction";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        information: null,
        requests: [],
        postrequests: [],
        dataInfo: null,
		followers: null,
		posts: null
    },
    reducers: {
        findFriend: (state, action) => {
            state.friends = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUserInfo.fulfilled, (state, action) => {
                state.dataInfo = action.payload;
            })
            .addCase(SetUser.fulfilled, (state, action) => {
                const infor = action.payload;
                state.information = infor?.information || null;
                state.requests = infor?.requests || [];
                state.followers = infor?.followers?.length || 0;
                state.posts = infor?.posts?.length || 0;
                state.postrequests = infor?.postrequests || [];
            })
            .addCase(SetUser.rejected, (state) => {
                state.information = null;
                state.requests = [];
                state.postrequests = [];
            })
            .addCase(acceptRequests.fulfilled, (state, action) => {
                const result = action.payload.newRequest
                const index = state.requests.findIndex(e => e.notificationId == result.notificationId)
                state.requests[index] = result
                // state.requests = action.payload;
            })
            .addCase(deleteRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
            })
            .addCase(denyRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
            })
            .addCase(addHistory.fulfilled, (state, action) => {
                state.historysearch = action.payload;
            })
            .addCase(deleteHistory.fulfilled, (state, action) => {
                state.historysearch = action.payload;
            })
            .addCase(updateHistory.fulfilled, (state, action) => {
                state.historysearch = action.payload;
            });
    },
});

export const { findFriend } = UserSlice.actions;
export default UserSlice.reducer;
