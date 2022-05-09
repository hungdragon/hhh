import {processColor, ProcessedColorValue} from 'react-native';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface typeProps {
    fullName: string;
    phoneNumber: string;
  }
const initialState:typeProps={
    fullName:'',
    phoneNumber:'',
    
}

const userSlice=createSlice({
    name:"userInformation",
    initialState,
    reducers:{
        setFullName:(state, action:PayloadAction<string>) =>{
            state.fullName=action.payload;
        },
        setPhoneNumber:(state, action:PayloadAction<string>) =>{
            state.phoneNumber=action.payload;
        }
    }
})
export const{ setFullName,setPhoneNumber}=userSlice.actions;
export default userSlice.reducer;