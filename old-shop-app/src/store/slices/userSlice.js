import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: null,
    nickname: null,
    image: null,
    id: null,
    role: null
};

const userSlice = createSlice({
    name: "user", 
    initialState,
    reducers: {
        setUser(state, action) {
            state.token = action.payload.token
            state.nickname = action.payload.nickname
            state.image = action.payload.image
            state.id = action.payload.id
            state.role = action.payload.role
        },
        removeUser(state) {
            state.token = null
            state.nickname = null
            state.image = null
            state.id = null
            state.role = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer;