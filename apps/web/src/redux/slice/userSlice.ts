import { User } from '@/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// interface User {
//     id: number;
//     email: string;
//     password: string;
// }

const initialState: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
    },
    logoutAction: (state) => {
        state.id = 0;
        state.email = '';
        state.firstName = '';
        state.lastName = '';
    }
  }
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;