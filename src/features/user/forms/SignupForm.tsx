import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useGenerateOtpMutation } from '../Api';
import { useSelector } from 'react-redux';


const SignUpForm = (props: any) => {
	const { query } = props
	const dispatch = useAppDispatch()
	const [generateOtp, result] = useGenerateOtpMutation()
	const [values, setValues] = useState<any>({})

	const userState: any = {}

	useEffect(() => {
		if (result.isSuccess) {
			props.onSubmited({ isValid: true, values: values })
		}
	}, [result])

	return (
		<Formik
			initialValues={{ 
				first_name: userState?.first_name ? userState?.first_name : '',
				last_name: userState?.last_name ? userState?.last_name : '',
				issuer: query?.issuer ? query.issuer : userState?.issuer, 
				password: '' 
			}}
			validationSchema={Yup.object({
				first_name: Yup.string()
					.required('Required'),
				last_name: Yup.string(),
				issuer: Yup.string()
					.email('Enter valid issuer')
					.required('Required'),
				password: Yup.string()
					.min(6, 'Password lengh min 6 characters')
					.required('Required')
			})}
			onSubmit={async (values, { setSubmitting }) => {
				setValues(values)
				await generateOtp({'issuer': values.issuer})
				
			}}
			render={({ handleChange, touched, errors, values }) => (
				<Form>
					<Box>
						<Grid container spacing={2} sx={{ mb: 3}}>
							<Grid item xs={12} sm={6} md={12} lg={6}>
								<TextField
									autoComplete="given-name"
									name="first_name"
									fullWidth
									id="first_name"
									label="First Name"
									autoFocus
									size="small"
									onChange={handleChange}
									value={values.first_name}
									error={touched.first_name && Boolean(errors.first_name)}
									helperText={touched.first_name && errors.first_name?.toLocaleString()}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={12} lg={6}>
								<TextField
									fullWidth
									id="last_name"
									label="Last Name"
									name="last_name"
									autoComplete="family-name"
									size="small"
									onChange={handleChange}
									value={values.last_name}
									error={touched.last_name && Boolean(errors.last_name)}
									helperText={touched.last_name && errors.last_name?.toLocaleString()}
								/>
							</Grid>
						</Grid>

						<FormControl fullWidth sx={{ mb: 3}}>
							<TextField
								label="Email Address"
								size="small"
								name="issuer"
								autoComplete="issuer"
								autoFocus
								onChange={handleChange}
								value={values.issuer}
								error={touched.issuer && Boolean(errors.issuer)}
								helperText={touched.issuer && errors.issuer?.toLocaleString()}
							/>
						</FormControl>

						<FormControl fullWidth>
							<TextField
								label="Create New Password"
								size="small"
								name="password"
								type="password"
								autoComplete="current-password"
								onChange={handleChange}
								value={values.password}
								error={touched.password && Boolean(errors.password)}
								helperText={touched.password && errors.password?.toLocaleString()}
							/>
						</FormControl>

						<Button 
							fullWidth
							variant="contained" 
							type="submit"
							disabled={result.isLoading}
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
							{"Sign Up"}
						</Button>
					</Box>
				</Form>
			)}
		/>
	)
}

export default SignUpForm