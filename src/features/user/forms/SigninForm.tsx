import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Box, FormHelperText } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAcquireTokenMutation } from '../Api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../lib/hooks';
import { getSession, signIn, useSession } from "next-auth/react"
import axios from 'axios';


const SignInForm = (props: {
	role: string
}) => {
	const USER_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/wp/v2/users`
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { data: sessionData } = useSession()
	const [acquireToken, result] = useAcquireTokenMutation()
	const [isError, setIsError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { data: session, status } = useSession({ required: false })

	useEffect(() => {
		setIsError(result.isError)
	}, [result])

	const retrieveSession = async () => {
		// Create user if no exists
		try {
			// @ts-ignore
			const auth = session?.user?.auth
			const email = auth?.email
			const nameMatch = email?.match(/^([^@]*)@/);
			const username = nameMatch?.[1];
			// @ts-ignore
			const password = auth.id;
			const res = await axios.post(USER_BASE_URL, {
				roles: [props.role],
				email: email,
				// @ts-ignore
				name: auth?.name,
				username: username,
				password: password,
			})
		} catch (error) {
			// no action
			// console.log(error)
		}
	}

	const onSignin = async (provider: string) => {
		setIsLoading(true)
		await signIn(provider, {redirect: false})
	}

	useEffect(() => {
		if (status === 'authenticated') {
			retrieveSession()
		}
	}, [status])

	return (
		<>
			{status == 'loading' || isLoading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			) : (
				<Box textAlign={'center'}>
					<Button 
						type='button' 
						variant='contained' 
						color='error' 
						size='large'
						onClick={() => onSignin('google')}
						sx={{ borderRadius: 6, width: '100%' }}
						startIcon={<GoogleIcon />}
					>
						{"Continue with Google"}
					</Button>

					<Button 
						type='button' 
						variant='contained' 
						color='error' 
						size='large'
						onClick={() => onSignin('linkedin')}
						sx={{ 
							borderRadius: 6, 
							width: '100%', 
							marginTop: 2.5, 
							backgroundColor: '#0072b1',
							['&:hover']: {
								backgroundColor: '#126d9f'
							}
						}}
						startIcon={<LinkedInIcon />}
					>
						{"Continue with LinkedIn"}
					</Button>
				</Box>
			)}
			
			{/*
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={Yup.object({
					email: Yup.string()
						.email('Enter valid email')
						.required('Required'),
					password: Yup.string()
						.min(6, 'Password lengh min 6 characters')
						.required('Required')
				})}
				onSubmit={async (values, { setSubmitting }) => {
					// await acquireToken({
					// 	username: values.email,
					// 	password: values.password,
					// })

					setIsError(false)

					const login = await signIn(
						"credentials", 
						{
							redirect: false,
							username: values.email, 
							password: values.password 
						}
					)
						
					if (!login?.ok) {
						setIsError(true)
					} else {
						router.push(`/rejection`)
					}
				}}
				render={({ handleChange, touched, values, errors, isSubmitting }) => (
					<Form>
						<Box>
							<FormControl fullWidth sx={{ mb: 3}}>
								<TextField
									label="Email Address"
									size="small"
									name="email"
									autoComplete="email"
									autoFocus
									onChange={handleChange}
									value={values.email}
									error={touched.email && Boolean(errors.email)}
									helperText={touched.email && errors.email}
								/>
							</FormControl>

							<FormControl fullWidth>
								<TextField
									label="Your Password"
									size="small"
									name="password"
									type="password"
									autoComplete="current-password"
									onChange={handleChange}
									value={values.password}
									error={touched.password && Boolean(errors.password)}
									helperText={touched.password && errors.password}
								/>

								<FormHelperText sx={{ textAlign: 'right' }}>
									<Link href="/lost-password">
										<a>{"Lost password?"}</a>
									</Link>
								</FormHelperText>
							</FormControl>

							{isError &&
								<Alert severity="error" sx={{ marginTop: 2 }}>
									{"Your email or password is invalid."}
								</Alert>
							}

							<Button 
								fullWidth
								variant="contained" 
								type="submit"
								disabled={result.isLoading || status == 'loading' || isSubmitting}
								sx={[
									{
										mt: 3,
										backgroundColor: '#E78D5B',
										'&:hover': {
											backgroundColor: '#B14302'
										}
									},
								]}
							>
								{"Sign In"}
							</Button>
						</Box>
					</Form>
				)}
			/>
			*/}
		</>
	)
}

export default SignInForm