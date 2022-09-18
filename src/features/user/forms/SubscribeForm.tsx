import FormControl from '@mui/material/FormControl';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';


const SubscribeForm = () => {
	const router = useRouter()

	return (
		<Formik
			initialValues={{
				issuer: '',
			}}
			validationSchema={Yup.object({
				issuer: Yup.string()
					.email('Enter valid email')
					.required('Required')
			})}
			onSubmit={(values, { setSubmitting }) => {
				router.push({
					pathname: '/signup',
					query: { issuer: values.issuer },
				})
			}}
			render={({ handleChange, values, touched, errors }) => (
				<Form>
					<Grid container>
						<Grid item xs={12} sm={8}>
							<FormControl fullWidth variant="outlined">
								<OutlinedInput
									id="issuer"
									name="issuer"
									type="email"
									size="small"
									value={values.issuer}
									onChange={handleChange('issuer')}
									error={touched.issuer && Boolean(errors.issuer)}
									startAdornment={<InputAdornment position="start"><MailOutlineIcon /></InputAdornment>}
									inputProps={{
										'placeholder': "Your issuer use email or msisdn",
									}}
								/>
							</FormControl>
						</Grid>
			
						<Grid 
							item 
							xs={12} 
							sm={4}
							sx={{
								paddingLeft: {
									sm: 2,
								},
								marginTop: {
									xs: 3,
									sm: 0,
								}
							}}
						>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								sx={{ 
									paddingTop: '7px', 
									paddingBottom: '8px',
								}}
							>
								{"Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</Form>
			)}
		/>
	)
}

export default SubscribeForm