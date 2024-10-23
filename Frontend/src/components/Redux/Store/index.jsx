import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Slices/LoginSlice";
import UserReducer from "../Slices/UserSlice";
import LocationReducer from "../Slices/LocationSlice"

const Store = configureStore({
    reducer: {
        login: LoginReducer,
        user: UserReducer,
        location: LocationReducer
    },
});

export default Store;
