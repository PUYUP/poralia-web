import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ApplicationState {
	tagsFiltered: any
	queryFilter: any
}

const initialState: ApplicationState = {
	tagsFiltered: [],
	queryFilter: {}
}

export const applicationSlice = createSlice({
	name: 'application',
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
		setQueryFilter: (state, action: PayloadAction<any>) => {
			state.queryFilter = {
				...state.queryFilter,
				...action.payload,
			}
		}
	},
})
  
// Action creators are generated for each case reducer function
export const { setTagFiltered, removeTagFiltered, setQueryFilter } = applicationSlice.actions

export default applicationSlice.reducer