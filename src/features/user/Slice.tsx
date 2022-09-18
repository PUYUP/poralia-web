import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
	account: any
}

const initialState: UserState = {
	account: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateAccount: (state, action: PayloadAction<any>) => {
			state.account = {
				...state.account,
				...action.payload,
			}
		},
	},
})
  
// Action creators are generated for each case reducer function
export const { updateAccount } = userSlice.actions

export const selectAccount = (state: UserState) => state.account

export default userSlice.reducer