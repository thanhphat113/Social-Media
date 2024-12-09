import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Slices/LoginSlice";
import UserReducer from "../Slices/UserSlice";
import FriendReducer from "../Slices/FriendSlice"
import MessageReducer from "../Slices/MessageSlice"
import ProfileReducer from "../Slices/ProfileSlice"
import GroupChatReducer from "../Slices/GroupChatSlice"

const Store = configureStore({
    reducer: {
        login: LoginReducer,
        user: UserReducer,
        friends: FriendReducer,
        message: MessageReducer,
        profile: ProfileReducer,
        groupchat: GroupChatReducer,
    },
});

export default Store;
