import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
	account: any,
	query: any,
}

const initialState: UserState = {
	account: undefined,
	query: undefined,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAccount: (state, action: PayloadAction<any>) => {
			state.account = {
				...state.account,
				...action.payload,
			}
		},
		setQuery: (state, action: PayloadAction<any>) => {
			state.query = {
				...state.query,
				...action.payload,
			}
		},
	},
})
  
// Action creators are generated for each case reducer function
export const { 
	setAccount,
	setQuery,
} = userSlice.actions

export const selectAccount = (state: UserState) => state.account

export default userSlice.reducer