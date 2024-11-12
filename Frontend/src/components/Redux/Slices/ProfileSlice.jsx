import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
	name:"profile",
	initialState:{
		infomation: [],
		posts: [],
		medias: [],
	},
	reducers:{},
	extraReducers:(builder) => {}
})

export default ProfileSlice.reducer