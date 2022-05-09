import {processColor, ProcessedColorValue} from 'react-native';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface typeProps {
    namePitch: string;
    timeBooking:string;
    dayPitch:string;
    id:string;
    code:string;
 //   codeDayNow:string;
    data:Array<Object>;
  }
const initialState:typeProps={
    namePitch:'',
    timeBooking:'',
    dayPitch:'',
    
    id:'',
    code:'',
 ///   codeDayNow:'',
    data:[]
    
}

const FootballSlice=createSlice({
    name:"Football-Information",
    initialState,
    reducers:{
        setNamePitch:(state, action:PayloadAction<string>) =>{
            state.namePitch=action.payload;
        },
        setTimeBooking:(state, action:PayloadAction<string>) =>{
            state.timeBooking=action.payload;
        },
        setCode:(state, action:PayloadAction<string>) =>{
            state.code=action.payload;
        },
        // setCodeDayNow:(state, action:PayloadAction<string>) =>{
        //     state.codeDayNow=action.payload;
        // },
        setData:(state, action:PayloadAction<[]>) =>{
            state.data=action.payload;
        },
        setId:(state, action:PayloadAction<string>) =>{
            state.id=action.payload;
        },
        setDay:(state, action:PayloadAction<string>)=>{
            console.log('xuong day r');
            state.dayPitch=action.payload;
        }
    }
})
export const{setNamePitch,setTimeBooking ,setCode,setData,setId,setDay}=FootballSlice.actions;
export default FootballSlice.reducer;