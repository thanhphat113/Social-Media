import { createSlice } from "@reduxjs/toolkit";
import { SetUser, deleteRequests, acceptRequests } from "../Actions/UserAction";
import { addHistory, deleteHistory } from "../Actions/HistorySearchAction";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        information: null,
		friends: [],
		historysearch: [],
		requests: [],
		postrequests: [],
    },
    reducer: {},
	extraReducers:(builder) => {
		builder
			.addCase(SetUser.fulfilled,(state,action) => {
				const infor = action.payload
				state.information = infor?.information || null
				state.friends = infor?.friends || []
				state.historysearch = infor?.historysearch || []
				state.requests = infor?.requests || []
				state.postrequests = infor?.postrequests || []
			})
			.addCase(SetUser.rejected,(state) => {
				state.information = null
				state.friends = []
				state.historysearch = []
				state.requests = []
				state.postrequests = []
			})
			.addCase(acceptRequests.fulfilled,(state,action) => {
				state.requests = action.payload
			})
			.addCase(deleteRequests.fulfilled,(state,action) => {
				state.requests = action.payload
			})
			.addCase(addHistory.fulfilled,(state,action) => {
				state.historysearch = action.payload
			})
			.addCase(deleteHistory.fulfilled,(state,action) => {
				state.historysearch = action.payload
			})
			
	}
});

export default UserSlice.reducer
