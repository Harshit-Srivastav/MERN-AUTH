import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  token: ''
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUser: (state, action) => {
     return {
       ...state,
       name: action.payload.name,
       token: action.payload.token
     }
    },
    deleteUser: (state) => {
       return {
        name: '',
        token: ''
       }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, deleteUser } = userSlice.actions

export default userSlice.reducer