import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession, useSession } from 'next-auth/react'


export const activityApi = createApi({
	reducerPath: 'activityApi',
	tagTypes: ['Activity'],
	baseQuery: fetchBaseQuery({ 
		baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
		prepareHeaders: async (headers, { getState }) => {
			const session = await getSession()

			// @ts-ignore
			let token = session?.user?.token

			// By default, if we have a token in the store, let's use that for authenticated requests
			if (token) {
			  	headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		}
	}),
	endpoints: (build) => ({
		listActivity: build.query<any, any>({
			query: ({ ...params }) => {
				const urlParams = new URLSearchParams(params)
				return {
					url: `/buddypress/v1/activity?_embed&${urlParams}`,
					method: 'GET',
				}
			},
			providesTags: (result) =>
				result
				? [
					...result.map(({ id }: any) => ({ type: 'Activity' as const, id })),
					{ type: 'Activity', id: 'LIST' },
				]
				: [{ type: 'Activity', id: 'LIST' }],
		}),
		retrieveActivity: build.query<any, any>({
			query: ({ id }) => ({
				url: `/buddypress/v1/activity/${id}`,
				method: 'GET',
			})
		}),
		// actualy is rejection post type
		createRejectionActivity: build.mutation<any, any>({
			query: (body) => ({
				url: `/wp/v2/rejections`,
				method: 'POST',
				body: body,
			}),
			async onQueryStarted({...newObj}, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled
				const { activity, author } = data
				
				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', { type: 'new_rejection' }, drafts => {
						drafts.unshift({ 
							...activity, 
							rejection: data,
							author: author,
						})
					})
				)
			}
		}),
		updateRejectionActivity: build.mutation<any, any>({
			query: ({id, ...body}) => ({
				url: `/wp/v2/rejections/${id}`,
				method: 'PUT',
				body: body,
			}),
			async onQueryStarted({id, ...patch}, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled
				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', { type: 'new_rejection' }, drafts => {
						const index = drafts.findIndex((obj: any) => obj.id == data.activity.id)
						drafts[index].rejection = data
					})
				)
			}
		}),
		deleteActivity: build.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/buddypress/v1/activity/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => [{ type: 'Activity', id }],
		}),
		favoriteActivity: build.mutation<any, any>({
			query: (id) => ({
				url: `/buddypress/v1/activity/${id}/favorite`,
				method: 'POST',
			}),
			async onQueryStarted(activityId, { dispatch, queryFulfilled }) {
				// `updateQueryData` requires the endpoint name and cache key arguments,
				// so it knows which piece of cache state to update
				const { data } = await queryFulfilled
				const patchResult = dispatch(
				  	activityApi.util.updateQueryData('listActivity', { type: 'new_rejection' }, draft => {
						// The `draft` is Immer-wrapped and can be "mutated" like in createSlice
						const post = draft.find((post: any) => post.id == activityId)
						if (post) {
							if (data?.[0]?.favorite_count > post.favorite_count) {
					  			post.favorite_count++
								post.favorited = true
							} else {
								post.favorite_count--
								post.favorited = false
							}
						}
				  	})
				)
			}
		}),
	})
})

// Export hooks for usage in functional components
export const {
	// name combined from 'use<endpoint name><endpoint type> in camelCase
	useCreateRejectionActivityMutation,
	useUpdateRejectionActivityMutation,
	useDeleteActivityMutation,
	useListActivityQuery,
	useRetrieveActivityQuery,
	useFavoriteActivityMutation,
} = activityApi

