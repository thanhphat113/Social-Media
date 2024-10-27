import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../Actions/LoginActions";

const LoginSlice = createSlice({
    name: "login",
    initialState: {
        isLogin: false,
        status: "",
    },
    reducers: {
		setLogin: (state) => {
			state.isLogin =true 
		}
	},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLogin = true;
                    state.status = "Đăng nhập thành công";
                } else {
                    state.isLogin = false;
                    state.status =
                        "Bạn đã nhập sai email hoặc mật khẩu, Vui lòng kiểm tra lại !!!";
                }
            })

			.addCase(login.rejected, (state, action) => {
                state.isLogin = false;
                state.status = "Lỗi xảy ra ở backend đăng nhập";
            })

            .addCase(logout.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLogin = false;
                    state.status = "Đăng xuất thành công !";
                }
            })

            .addCase(logout.rejected, (state, action) => {
                state.isLogin = true;
                state.status = "Lỗi xảy ra ở backend đăng xuất";
            });
    },
});

export const { setLogin } = LoginSlice.actions
export default LoginSlice.reducer;
