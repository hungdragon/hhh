import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface typeProps {
  data: Array<any>;
  name_search:string
}
const initialState: typeProps = {
  data: [],
  name_search:''
};

const FindPitchSlice = createSlice({
  name: "FindPitchs",
  initialState,
  reducers: {
    setDataFind: (state, action: PayloadAction<any>) => {
      console.log('99999999--');
      state.data = action.payload;
    },
    setNameSearch: (state, action: PayloadAction<any>) => {
      console.log('99999999--');
      state.name_search = action.payload;
    },
  },
});
export const { setDataFind,setNameSearch } = FindPitchSlice.actions;
export default FindPitchSlice.reducer;
