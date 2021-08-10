import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bgRemoved: null
}

const removeBgSlice = createSlice({
    name: 'removeBg',
    initialState,
    reducers: {
        setActionStatus: (state, action ) => {
            console.log(action);
            return { ...state, bgRemoved: action.payload };
        },
    },
});

export const { setActionStatus } = removeBgSlice.actions;
export default removeBgSlice.reducer;