import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import Link from 'next/link';
import { orange } from '@mui/material/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import LostPasswordForm from '../features/user/forms/LostPasswordForm';
import Copyright from '../components/Copyright';
import Button from '@mui/material/Button';
import { theme } from '../lib/_theme';
import { SideInfo } from '../components/SiteInfo';
import { SideBackToHome } from '../components/SideBackToHome';
import SideLayout from '../components/SideLayout';

export default function LostPasswordSide() {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Sign In | Poralia</title>
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
								{"Lost Password"}
							</Typography>

							<Box className="w-4/5 md:w-4/5 lg:w-7/12 xl:w-6/12" sx={{ mt: 4 }}>
								<LostPasswordForm />

								<Box sx={{ mt: 4, textAlign: 'center' }}>
									<Link href="/signin">
										{"Remember password? Sign in instead"}
									</Link>
								</Box>

								<Copyright sx={{ mt: 5 }} />
							</Box>
						</Box>
					</Grid>
				</Grid>
			</SideLayout>
		</ThemeProvider>
	);
}