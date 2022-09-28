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
		createActivity: build.mutation<any, any>({
			query: (body) => {
				return {
					url: `/buddypress/v1/activity`,
					method: 'POST',
					body: body,
				}
			},
			async onQueryStarted({ ...body }, { dispatch, queryFulfilled, getState }) {
				const { data } = await queryFulfilled
				const [ activity ] = data 

				// @ts-ignore
				const queryFilter = getState().activity.queryFilter

				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', queryFilter, drafts => {
						if (activity.type == 'activity_comment' && activity.secondary_type == 'job_offered') {
							const post = drafts.find((post: any) => post.id == activity.primary_item_id)
							if (post) {
								console.log(activity)
								post.offering.total++
								post.offering.activities = [
									{...activity},
									...post.offering.activities,
								]
							}
						}
					})
				)
			},
		}),
		updateActivity: build.mutation<any, any>({
			query: ({ id, ...body }) => ({
				url: `/buddypress/v1/activity/${id}`,
				method: 'PUT',
				body: body,
			})
		}),
		listActivity: build.query<any, any>({
			query: ({ ...params }) => {
				params = Object.fromEntries(Object.entries(params).filter(([_, v]) => v));
				const urlParams = new URLSearchParams(params)

				return {
					url: `/buddypress/v1/activity?_embed&${urlParams}`,
					method: 'GET',
				}
			},
			providesTags: (result = []) => [
				...result.map(({ id }: any) => ({ type: 'Activity', id } as const)),
				{ type: 'Activity' as const, id: 'LIST' },
			],
		}),
		retrieveActivity: build.query<any, any>({
			query: ({ id }) => ({
				url: `/buddypress/v1/activity/${id}`,
				method: 'GET',
			})
		}),
		deleteActivity: build.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/buddypress/v1/activity/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (activity) => [{ type: 'Activity', id: activity?.id }],
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
				  	activityApi.util.updateQueryData('listActivity', { type: 'new_rejection' }, drafts => {
						// The `drafts` is Immer-wrapped and can be "mutated" like in createSlice
						const post = drafts.find((post: any) => post.id == activityId)
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
		
		/**
		 * POST TYPE START HERE
		 */
		// REJECTION
		createRejection: build.mutation<any, any>({
			query: (body) => ({
				url: `/wp/v2/rejections`,
				method: 'POST',
				body: body,
			}),
			async onQueryStarted({...newObj}, { dispatch, queryFulfilled, getState }) {
				const { data } = await queryFulfilled
				const { activity, author } = data

				// @ts-ignore
				const queryFilter = getState().activity.queryFilter
				
				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', queryFilter, drafts => {
						drafts.unshift({ 
							...activity, 
							secondary_item: data,
							author: author,
						})
					})
				)
			},
			invalidatesTags: [{ type: 'Activity', id: 'LIST' }],
		}),
		updateRejection: build.mutation<any, any>({
			query: ({id, ...body}) => ({
				url: `/wp/v2/rejections/${id}`,
				method: 'PUT',
				body: body,
			}),
			async onQueryStarted({id, ...patch}, { dispatch, queryFulfilled, getState }) {
				// @ts-ignore
				const queryFilter = getState().activity.queryFilter
				const { data } = await queryFulfilled

				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', queryFilter, drafts => {
						const index = drafts.findIndex((obj: any) => obj.id == data.activity.id)
						drafts[index].secondary_item = data
					})
				)
			},
			invalidatesTags: (activity) => [{ type: 'Activity', id: activity?.id }],
		}),

		// APPLICATION
		createApplication: build.mutation<any, any>({
			query: (body) => ({
				url: `/wp/v2/applications`,
				method: 'POST',
				body: body,
			}),
			async onQueryStarted({...newObj}, { dispatch, queryFulfilled, getState }) {
				const { data } = await queryFulfilled
				const { activity, author } = data

				// @ts-ignore
				const queryFilter = getState().activity.queryFilter
				
				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', queryFilter, drafts => {
						drafts.unshift({ 
							...activity, 
							secondary_item: data,
							author: author,
						})
					})
				)
			},
			invalidatesTags: [{ type: 'Activity', id: 'LIST' }],
		}),
		updateApplication: build.mutation<any, any>({
			query: ({id, ...body}) => ({
				url: `/wp/v2/applications/${id}`,
				method: 'PUT',
				body: body,
			}),
			async onQueryStarted({id, ...patch}, { dispatch, queryFulfilled, getState }) {
				// @ts-ignore
				const queryFilter = getState().activity.queryFilter
				const { data } = await queryFulfilled

				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', queryFilter, drafts => {
						const index = drafts.findIndex((obj: any) => obj.id == data.activity.id)
						drafts[index].secondary_item = data
					})
				)
			},
			invalidatesTags: (activity) => [{ type: 'Activity', id: activity?.id }],
		}),

		// CURRENT JOB
		createExperience: build.mutation<any, any>({
			query: (body) => ({
				url: `/wp/v2/experiences`,
				method: 'POST',
				body: body,
			}),
			async onQueryStarted({...newObj}, { dispatch, queryFulfilled, getState }) {
				const { data } = await queryFulfilled
				const { activity, author } = data

				// @ts-ignore
				const queryFilter = getState().activity.queryFilter
				
				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', queryFilter, drafts => {
						drafts.unshift({ 
							...activity, 
							secondary_item: data,
							author: author,
						})
					})
				)
			},
			invalidatesTags: [{ type: 'Activity', id: 'LIST' }],
		}),
		updateExperience: build.mutation<any, any>({
			query: ({id, ...body}) => ({
				url: `/wp/v2/experiences/${id}`,
				method: 'PUT',
				body: body,
			}),
			async onQueryStarted({id, ...patch}, { dispatch, queryFulfilled, getState }) {
				// @ts-ignore
				const queryFilter = getState().activity.queryFilter
				const { data } = await queryFulfilled

				const patchResult = dispatch(
					activityApi.util.updateQueryData('listActivity', queryFilter, drafts => {
						const index = drafts.findIndex((obj: any) => obj.id == data.activity.id)
						drafts[index].secondary_item = data
					})
				)
			},
			invalidatesTags: (activity) => [{ type: 'Activity', id: activity?.id }],
		}),

		listTags: build.query<any, any>({
			query: ({ ...params }) => {
				const urlParams = new URLSearchParams(params)
				return {
					url: `/wp/v2/tags?${urlParams}`,
					method: 'GET',
				}
			},
		}),
	})
})

// Export hooks for usage in functional components
export const {
	// name combined from 'use<endpoint name><endpoint type> in camelCase
	useCreateRejectionMutation,
	useUpdateRejectionMutation,

	useCreateApplicationMutation,
	useUpdateApplicationMutation,
	
	useCreateExperienceMutation,
	useUpdateExperienceMutation,

	useCreateActivityMutation,
	useUpdateActivityMutation,

	useDeleteActivityMutation,
	useListActivityQuery,
	useRetrieveActivityQuery,
	useFavoriteActivityMutation,

	useListTagsQuery,
} = activityApi

