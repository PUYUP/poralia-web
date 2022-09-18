import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { signIn } from "next-auth/react";

const USER_BASE_URL = `${process.env.BASE_API_URL}/wp/v2/users/`
const JWT_BASE_URL = `${process.env.BASE_API_URL}/jwt-auth/v1/token`


export const authOptions = (req) => ({
	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: '/signin',
		error: '/signin'
	},
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			try {
				const nameMatch = user.email.match(/^([^@]*)@/);
				const username = nameMatch[1];
				const password = (username + user.email).repeat(3);
				const role = req.cookies['next-auth.callback-url'].split('=')?.[1]
				const res = await axios.post(USER_BASE_URL, {
					roles: role ? [role] : ['candidate'],
					email: user.email,
					name: user.name,
					username: nameMatch[1],
					password: password,
				})
			} catch (error) {
				// no action
				// console.log(error)
			}

			return true
		},
		async session({ session, token }) {
			const nameMatch = session.user.email.match(/^([^@]*)@/);
			const username = nameMatch[1];
			const email = session.user.email;
			const password = (username + session.user.email).repeat(3);

			// acquired JWT token
			let jwtToken = null

			try {
				const jwt = await axios.post(JWT_BASE_URL, {
					username: email,
					password: password,
				})

				jwtToken = jwt.data.token
				session.user.token = jwtToken
			} catch (error) {
				// pass
				// console.log(error)
			}

			// retrieve user from database
			try {
				const user = await axios.get(`${USER_BASE_URL}me`, {
					headers: {
						'Authorization': `Bearer ${jwtToken}` 
					}
				})

				session.user.name = user.data.name
				session.user.id = user.data.id
			} catch (error) {
				// pass
			}

			return session
		},
	},
	adapter: FirestoreAdapter({
		apiKey: process.env.FIREBASE_API_KEY,
		appId: process.env.FIREBASE_APP_ID,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.FIREBASE_DATABASE_URL,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
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
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
			clientId: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
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
				const res = await fetch(`${process.env.BASE_API_URL}/jwt-auth/v1/token`, {
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