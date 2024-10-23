import { createSlice } from "@reduxjs/toolkit";
import { SetUser } from "../Actions/UserAction";



const UserSlice = createSlice({
    name: "user",
    initialState: {
        value: null,
		status: ''
    },
    reducer: {},
	extraReducers:(builder) => {
		builder
			.addCase(SetUser.fulfilled,(state,action) => {
				state.value = action.payload
				state.status = 'Đã tìm thấy'
			})
			.addCase(SetUser.rejected,(state,action) => {
				state.value = null
				state.status = null
			})
	}
});

export default UserSlice.reducer
