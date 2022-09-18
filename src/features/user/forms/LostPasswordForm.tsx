import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';


const LostPasswordForm: React.FC = () => {
	return (
		<Formik
			initialValues={{ email: '', }}
			validationSchema={Yup.object({
				email: Yup.string()
					.email('Enter valid email')
					.required('Required'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values)
			}}
			render={({ handleChange, touched, errors }) => (
				<Form>
					<Box>
						<FormControl fullWidth sx={{ mb: 1}}>
							<TextField
								label="Email Address"
								size="small"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={handleChange}
								error={touched.email && Boolean(errors.email)}
								helperText={touched.email && errors.email}
							/>
						</FormControl>

						<Button 
							fullWidth
							variant="contained" 
							type="submit"
							sx={[
								{
									mt: 1,
									backgroundColor: '#E78D5B',
									'&:hover': {
										backgroundColor: '#B14302'
									}
								},
							]}
						>
							{"Recover Password"}
						</Button>
					</Box>
				</Form>
			)}
		/>
	)
}

export default LostPasswordForm