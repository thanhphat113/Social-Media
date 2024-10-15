import { createSlice } from '@reduxjs/toolkit';
import { SetUser } from '../Actions/UserAction';
import { deleteMess } from '../Actions/MessageActions';
import { addMess, readMess } from "../Actions/MessageActions";

const FriendSlice = createSlice({
    name: 'friends',
    initialState: {
        searchFriends: [],
		allFriends: [],
		isLoad: false,
		isError: false
    },
    reducers: {},
	extraReducers: (builder) => {
		builder 
			.addCase(SetUser.fulfilled,(state, action) => {
				const infor = action.payload
				state.allFriends = infor?.friends || []
				state.isLoad = false
				state.isError = false
			})
			.addCase(SetUser.pending,(state) => {
				state.allFriends = []
				state.isLoad = true
				state.isError = false
			})
			.addCase(SetUser.rejected,(state) => {
				state.allFriends = []	
				state.isLoad = false
				state.isError = true
			})
			.addCase(deleteMess.fulfilled,(state, action) => {
				state.allFriends = action.payload
				state.isLoad = false
				state.isError = false
			})
			.addCase(deleteMess.pending,(state) => {
				state.isLoad = true
				state.isError = false
			})
			.addCase(deleteMess.rejected,(state) => {
				state.isLoad = false
				state.isError = true
			})
			.addCase(addMess.fulfilled,(state, action) => {
				state.allFriends = action.payload
			})
			.addCase(addMess.rejected,(state, action) => {
				console.log(action.payload)
			})
			.addCase(readMess.fulfilled,(state, action) => {
				state.allFriends = action.payload
			})
			.addCase(readMess.rejected,(state, action) => {
				console.log(action.payload)
			})
	}
});

export default FriendSlice.reducer;