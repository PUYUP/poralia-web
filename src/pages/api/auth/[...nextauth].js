import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

const USER_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/wp/v2/users/`
const JWT_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/jwt-auth/v1/token`

import { store } from "../../../lib/store";


export const authOptions = (req) => ({
	secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
	pages: {
		signIn: '/signin',
		error: '/signin'
	},
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
	},
	callbacks: {
		async session({ session, user }) {
			const email = user.email;
			const password = email.repeat(5);

			// insert google user
			session.user.auth = user

			// acquired JWT token
			if (!session.user?.token) {
				try {
					const jwt = await axios.post(JWT_BASE_URL, {
						username: email,
						password: password,
					})

					session.user.token = jwt.data.token
					session.user.id = jwt.data.user_id
				} catch (error) {
					// pass
					// console.log(error)
				}
			}

			return session
		},
	},
	adapter: FirestoreAdapter({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		// Optional emulator config (see below for options)
		// emulator: {
		// 	// Optional host, defaults to `localhost`
		// 	host: 'localhost',
		// 	// Optional port, defaults to `3001`
		// 	port: 3001,
		// },
	}),
	providers: [
		GoogleProvider({
			id: 'google',
			name: 'Google',
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
					role: "candidate" | "recruiter",
				}
			},
		}),
		LinkedInProvider({
			id: 'linkedin',
			name: 'LinkedIn',
			clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
			client: {
				token_endpoint_auth_method: "client_secret_post",
		  	},
		}),
		CredentialsProvider({
			id: 'credentials',
			name: "Credentials",
			credentials: {
				username: { label: "Email Address", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/jwt-auth/v1/token`, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { "Content-Type": "application/json" }
				})

				const user = await res.json()

				if (res.ok && user) {
					return user
				}

				return null
			}
		})
	]
})

export default (req, res) => NextAuth(req, res, authOptions(req))