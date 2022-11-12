import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IStateUser{
  email: string | null;
  token: string | null;
  id: number | null;
  firstName: string | null;
  lastName: string | null;
}

const initialState: IStateUser = {
  email: null,
  token: null,
  id: null,
  firstName: null,
  lastName:  null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth(state: IStateUser, action: any){
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;


    },
    removeUser(state: IStateUser){
      state.email = null;
      state.token = null;
      state.id = null;
      state.firstName = null;
      state.lastName = null;

    }
  } 
})

export const {setUserAuth, removeUser} = userSlice.actions;

export default userSlice.reducer;
