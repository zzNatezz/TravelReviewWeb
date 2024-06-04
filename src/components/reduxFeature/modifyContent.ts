import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IModifyContent {
    content : string,
    isFetching : boolean,
    error : boolean,
}

const initialState : IModifyContent = {
    content : "",
    isFetching  : false,
    error : false ,
}

export const IModifyContentSlice = createSlice({
    name : 'ModifyContent',
    initialState,
    reducers : {
        ModifyContentStart : (state) => {
           state.isFetching = true
        },
        ModifyContentSuccess : (state,action : PayloadAction<string>) =>{
            state.isFetching = false;
            state.content = action.payload;
            state.error = false;
        },
        ModifyContentEnd : (state) =>{
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    ModifyContentStart,
    ModifyContentSuccess,
    ModifyContentEnd
} = IModifyContentSlice.actions

export default IModifyContentSlice.reducer