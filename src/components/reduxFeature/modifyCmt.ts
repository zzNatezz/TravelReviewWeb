import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface modifyCmt {
    modifyCmtStt : {},
    isFetching : boolean,
    error : boolean,
}

const initialState : modifyCmt = {
    modifyCmtStt : {},
    isFetching  : false,
    error : false ,
}

export const modifyCmtSlice = createSlice({
    name : 'modifyCmt',
    initialState,
    reducers : {
        modifyCmtStart : (state) => {
           state.isFetching = true
  
        },
        modifyCmtSuccess : (state,action : PayloadAction<string>) =>{
            state.isFetching = false;
            state.modifyCmtStt = action.payload;
            state.error = false;
      
        },
        modifyCmtEnd : (state) =>{
            state.isFetching = false;
        }
    }
})

export const {
    modifyCmtStart,
    modifyCmtSuccess,
    modifyCmtEnd
} = modifyCmtSlice.actions

export default modifyCmtSlice.reducer