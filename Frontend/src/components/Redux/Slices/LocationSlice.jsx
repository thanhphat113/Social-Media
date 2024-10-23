import { createSlice } from '@reduxjs/toolkit';

const LocationSlice = createSlice({
    name: 'location',
    initialState: {
        current: null,
        previous: null,
    },
    reducers: {
        setLocation: (state, action) => {
            state.previous = state.current; // Lưu trữ location hiện tại vào location trước đó
            state.current = action.payload; // Cập nhật location hiện tại
        },
    },
});

export const { setLocation } = LocationSlice.actions;
export default LocationSlice.reducer;