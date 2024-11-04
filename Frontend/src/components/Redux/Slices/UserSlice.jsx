import { createSlice } from "@reduxjs/toolkit";
import { SetUser, getRequests } from "../Actions/UserAction";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        information: null,
		friends: [],
		requests: [],
		postrequests: []
    },
    reducer: {},
	extraReducers:(builder) => {
		builder
			.addCase(SetUser.fulfilled,(state,action) => {
				const infor = action.payload
				state.information = infor?.information || null
				state.friends = infor?.friends || []
				state.requests = infor?.requests || []
			})
			.addCase(SetUser.rejected,(state) => {
				state.information = null
				state.friends = []
				state.requests = []
			})
			.addCase(getRequests.fulfilled,(state,action) => {
				state.requests = action.payload
			})
			.addCase(getRequests.rejected,(state,action) => {
				state.requests = []
			})
	}
});

export default UserSlice.reducer
