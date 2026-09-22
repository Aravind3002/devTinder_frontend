import { createSlice } from "@reduxjs/toolkit";


const requestslice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addrequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            const newArray = state.filter((request) => request._id !== action.payload);
            return newArray;
        }
    }
});

export const {addrequest, removeRequest}=requestslice.actions;
export default requestslice.reducer;