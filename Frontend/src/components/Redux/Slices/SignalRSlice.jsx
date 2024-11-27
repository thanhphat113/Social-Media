import { createSlice } from "@reduxjs/toolkit";
import { connectSignalR } from "../Actions/ConnectSignalR";
import { logout } from "../Actions/LoginActions";

const SignalRSlice = createSlice({
    name: "signalR",
    initialState: {
        isConnected: false,
        isLoading: false,
        connectionId: null,
        state: null,
        error: {
            message: null,
            isError: false,
        },
    },
    reducers: {
        setConnection: (state, action) => {
            state.connectionId = action.payload;
            state.isConnected = true;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectSignalR.fulfilled, (state, action) => {
                state.isConnected = true,
                state.isLoading = false,
                state.connectionId = action.payload.connectionId,
                state.state = action.payload.state,
                state.error.isError = false
            })
            .addCase(connectSignalR.pending, (state) => {
                state.isConnected = false,
                    state.isLoading = true,
                    state.error.isError = false,
					state.connectionId = null,
                state.state = null
            })
            .addCase(connectSignalR.rejected, (state, action) => {
                state.isConnected = false,
                    state.isLoading = false,
                    state.error = { isError: true, message: action.payload },
					state.connectionId = null,
                state.state = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.isConnected = false,
                    state.isLoading = null,
                    state.error.isError = false;
					state.connectionId = null
            })
    },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
		  serializableCheck: {
			ignoredActions: ["signalR/connect/fulfilled"],
			ignoredPaths: ["signalR.connection"],
		  },
		}),
});

export const { setConnection } = SignalRSlice.actions

export default SignalRSlice.reducer;
