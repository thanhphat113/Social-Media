import { createSlice } from "@reduxjs/toolkit";

const HistorySearch = createSlice({
    name: "historySearch",
    initialState: {
        search: [],
        isLoading: false,
        isError: false,
    },
    reducers: {},
	extraReducers:{
		
	}
});
