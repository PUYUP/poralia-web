import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'

export interface User {
	ID: number
	user_login: string
	user_nicename: string
	user_email: string
	user_status: number
	display_name: string
}

export const userApi = createApi({
	reducerPath: 'userApi',
	tagTypes: ['User'],
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
		// JWT
		acquireToken: build.mutation<any, any>({
			query: (body) => ({
				url: `/jwt-auth/v1/token`,
				method: 'POST',
				body: body,
			})
		}),
		validateToken: build.mutation<any, any>({
			query: (body) => ({
				url: `/jwt-auth/v1/token/validate`,
				method: 'POST',
				body: body,
			})
		}),
		// OTP token
		generateOtp: build.mutation<any, any>({
			query: (body) => ({
				url: `/wp/v2/users/otps`,
				method: 'POST',
				body: body,
			})
		}),
		validateOtp: build.mutation<any, any>({
			query: ({code, ...body}) => ({
				url: `/wp/v2/users/otps/${code}`,
				method: 'PUT',
				body: body,
			})
		}),
		retrieveMe: build.query<any, any>({
			query: (id: string) => ({
				url: `/wp/v2/users/${id}`,
				method: 'GET',
			})
		}),
		updateUser: build.mutation<any, any>({
			query: ({id, body}) => ({
				url: `/wp/v2/users/me`,
				method: 'POST',
				body: body,
			}),
			async onQueryStarted({id, body}, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled
	
				const patchResult = dispatch(
					userApi.util.updateQueryData('retrieveMe', 'me', draft => {
						body.username = data.username
						Object.assign(draft, body)
					})
				)
			}
		}),
		retrieveUser: build.query<any, any>({
			query: (username: string) => ({
				url: `/wp/v2/users/${username}`,
				method: 'GET',
			})
		})
	})
})

export const {
	// name combined from 'use<endpoint name><endpoint type> in camelCase
	useAcquireTokenMutation,
	useValidateTokenMutation,
	useGenerateOtpMutation,
	useUpdateUserMutation,
	useValidateOtpMutation,
	useRetrieveMeQuery,
	useRetrieveUserQuery,
} = userApi