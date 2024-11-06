import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Slices/LoginSlice";
import UserReducer from "../Slices/UserSlice";
import FriendReducer from "../Slices/FriendSlice"
import MessageReducer from "../Slices/MessageSlice"
import ProfileReducer from "../Slices/ProfileSlice"

const Store = configureStore({
    reducer: {
        login: LoginReducer,
        user: UserReducer,
        friend: FriendReducer,
        message: MessageReducer,
        profile: ProfileReducer
    },
});

export default Store;
