import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import Link from 'next/link';
import { orange } from '@mui/material/colors';

import SignUpForm from '../features/user/forms/SignupForm';
import Copyright from '../components/Copyright';
import { theme } from '../lib/_theme';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IssuerValidationForm from '../features/user/forms/IssuerValidationForm';
import { SideInfo } from '../components/SiteInfo';
import { SideBackToHome } from '../components/SideBackToHome';
import { useAppSelector } from '../lib/hooks';
import SideLayout from '../components/SideLayout';


const SignUpSide = ({ query }: any) => {
	const [showIssuerValidation, setShowIssuerValidation] = useState<boolean>(false)
	const onSignUpSubmited = (data: any) => {
		const { isValid, values } = data
		setShowIssuerValidation(isValid)
	}

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>{"Sign Up | Poralia"}</title>
			</Head>
				
			<SideLayout>
				<Grid container component="main" sx={{ height: '100vh' }}>
					<CssBaseline />
					<Grid
						item
						xs={12}
						sm={6}
						md={7}
						sx={{
							//backgroundImage: 'url(https://s3.us-west-2.amazonaws.com/media.ooica.net/wp-content/uploads/2019/01/02233453/poraliarufescens-768x660.png)',
							//backgroundRepeat: 'no-repeat',
							backgroundColor: (t) => {
								return t.palette.mode === 'light' ? '#E78D5B' : orange[900]
							},
							//backgroundSize: 'cover',
							//backgroundPosition: 'center',
						}}
					>
						<Box className="flex items-center justify-center" sx={{ height: '100%'}}>
							<Box maxWidth="sm" padding={3}>
								<SideInfo />
							</Box>
						</Box>
					</Grid>
					
					<Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
						<Box
							sx={{
								my: 4,
								mx: 4,
								pt: 10,
								pb: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								position: 'relative',
							}}
						>
							<SideBackToHome />
							
							<Avatar sx={{ m: 1, bgcolor: 'transparent', width: 120, height: 120 }} src={'/poralia-logo-plain.png'}>
								<LockOutlinedIcon />
							</Avatar>

							<Typography component="h1" variant="h5">
								{!showIssuerValidation ? "Sign Up" : "Validate Your Email"}
							</Typography>

							<Box className="w-full md:w-4/5 lg:w-9/12 xl:w-7/12" sx={{ mt: 4 }}>
								{!showIssuerValidation ? (
									<>
										<SignUpForm query={query} onSubmited={onSignUpSubmited} />

										<Box sx={{ mt: 2, textAlign: 'center' }}>
											<Link href="/signin">
												{"Have an account? Sign In"}
											</Link>
										</Box>
									</>
								) : (
									<>
										<Box marginTop={1} marginBottom={4}>
											<Button variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={() => setShowIssuerValidation(false)}>
												{"Change Email"}
											</Button>

											<Typography
												fontSize={16}
												marginBottom={2}
											>
												{"Verification code has send to your email, enter here"}
											</Typography>

											<IssuerValidationForm />
										</Box>
									</>
								)}

								<Copyright sx={{ mt: 5 }} />
							</Box>
						</Box>
					</Grid>
				</Grid>
			</SideLayout>
		</ThemeProvider>
	);
}

SignUpSide.getInitialProps = ({ query }: any) => {
	return { query }
}

export default SignUpSide