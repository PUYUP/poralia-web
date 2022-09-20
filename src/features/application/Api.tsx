import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession, useSession } from 'next-auth/react'


export const applicationApi = createApi({
	reducerPath: 'applicationApi',
	tagTypes: ['Application'],
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
		listApplication: build.query<any, any>({
			query: ({ ...params }) => {
				const urlParams = new URLSearchParams(params)
				return {
					url: `/buddypress/v1/activity?_embed&${urlParams}`,
					method: 'GET',
				}
			},
			providesTags: (result = []) => [
				...result.map(({ id }: any) => ({ type: 'Application', id } as const)),
				{ type: 'Application' as const, id: 'LIST' },
			],
		}),
		retrieveApplication: build.query<any, any>({
			query: ({ id }) => ({
				url: `/buddypress/v1/activity/${id}`,
				method: 'GET',
			})
		}),
		// actualy is application post type
		createApplication: build.mutation<any, any>({
			query: (body) => ({
				url: `/wp/v2/applications`,
				method: 'POST',
				body: body,
			}),
			async onQueryStarted({...newObj}, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled
				const { application, author } = data
				
				const patchResult = dispatch(
					applicationApi.util.updateQueryData('listApplication', { type: 'new_application' }, drafts => {
						drafts.unshift({ 
							...application, 
							application: data,
							author: author,
						})
					})
				)
			},
			invalidatesTags: [{ type: 'Application', id: 'LIST' }],
		}),
		updateApplication: build.mutation<any, any>({
			query: ({id, ...body}) => ({
				url: `/wp/v2/applications/${id}`,
				method: 'PUT',
				body: body,
			}),
			async onQueryStarted({id, ...patch}, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled
				const patchResult = dispatch(
					applicationApi.util.updateQueryData('listApplication', { type: 'new_application' }, drafts => {
						const index = drafts.findIndex((obj: any) => obj.id == data.activity.id)
						drafts[index].application = data
					})
				)
			},
			invalidatesTags: (application) => [{ type: 'Application', id: application?.id }],
		}),
		deleteApplication: build.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/buddypress/v1/activity/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (application) => [{ type: 'Application', id: application?.id }],
		}),
	})
})

// Export hooks for usage in functional components
export const {
	// name combined from 'use<endpoint name><endpoint type> in camelCase
	useCreateApplicationMutation,
	useUpdateApplicationMutation,
	useDeleteApplicationMutation,
	useListApplicationQuery,
	useRetrieveApplicationQuery,
} = applicationApi

