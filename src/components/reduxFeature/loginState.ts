import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface loginState {
    status : boolean
}

const initialState : loginState = {
    status : false  
}

export const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {

    }
})

export default loginSlice.reducer