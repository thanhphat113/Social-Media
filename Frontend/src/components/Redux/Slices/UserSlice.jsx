import { createSlice } from "@reduxjs/toolkit";
import { SetUser } from "../Actions/UserAction";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        information: null,
		friends: []
    },
    reducer: {},
	extraReducers:(builder) => {
		builder
			.addCase(SetUser.fulfilled,(state,action) => {
				const infor = action.payload
				state.information = infor?.information || null
				state.friends = infor?.friends || [];
			})
			.addCase(SetUser.rejected,(state) => {
				state.information = null
				state.friends = []
			})
	}
});

export default UserSlice.reducer
