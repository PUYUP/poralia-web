import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RejectionState {
	tagsFiltered: any
}

const initialState: RejectionState = {
	tagsFiltered: []
}

export const rejectionSlice = createSlice({
	name: 'rejection',
	initialState,
	reducers: {
		setTagFiltered: (state, action: PayloadAction<any>) => {
			const exist = state.tagsFiltered.find((obj: any) => obj.id == action.payload.id)

			if (!exist) {
				state.tagsFiltered = [
					...state.tagsFiltered,
					action.payload,
				]
			}
		},
		removeTagFiltered: (state, action: PayloadAction<any>) => {
			state.tagsFiltered = state.tagsFiltered.filter((obj: any) => obj.id !== action.payload.id)
		},
	},
})
  
// Action creators are generated for each case reducer function
export const { setTagFiltered, removeTagFiltered } = rejectionSlice.actions

export default rejectionSlice.reducer