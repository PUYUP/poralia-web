import { Form, Formik } from "formik"
import * as Yup from "yup"
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useSelector } from "react-redux"
import { useValidateOtpMutation } from "../Api"
import { useEffect } from "react"
import Typography from "@mui/material/Typography"
import { useAppDispatch } from "../../../lib/hooks"
import { useRouter } from "next/router"


const IssuerValidationForm = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [validateOtp, result] = useValidateOtpMutation()

	useEffect(() => {
		if (result.isSuccess) {
			router.replace('/rejection')
		}
	}, [result])
	
	return (
		<Formik
			initialValues={{
				passcode_1: '',
				passcode_2: '',
				passcode_3: '',
				passcode_4: '',
				passcode_5: '',
				passcode_6: '',
			}}
			validationSchema={Yup.object({
				passcode_1: Yup.string()
					.required(),
				passcode_2: Yup.string()
					.required(),
				passcode_3: Yup.string()
					.required(),
				passcode_4: Yup.string()
					.required(),
				passcode_5: Yup.string()
					.required(),
				passcode_6: Yup.string()
					.required(),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				const passcode = ''

				for (let i = 1; i <= 6; i++) {
					const key: string = `passcode_${i.toString()}`

					// @ts-ignore
					passcode += values[key]
				}

				const param = {code: passcode}

				await validateOtp(param)
			}}
			render={({ values, handleChange, touched, errors }) => (
				<Form>
					<Grid container spacing={1} gap={0}>
						<Grid item xs={2}>
							<TextField 
								size="small" 
								name="passcode_1"
								onChange={handleChange}
								error={touched.passcode_1 && Boolean(errors.passcode_1)}
								inputProps={{ 
									maxLength: 1,
									style: { textAlign: 'center' },
									placeholder: "#"
								}}
							></TextField>
						</Grid>
						<Grid item xs={2}>
							<TextField 
								size="small" 
								name="passcode_2"
								onChange={handleChange}
								error={touched.passcode_2 && Boolean(errors.passcode_2)}
								inputProps={{ 
									maxLength: 1,
									style: { textAlign: 'center' },
									placeholder: "#"
								}}
							></TextField>
						</Grid>
						<Grid item xs={2}>
							<TextField 
								size="small" 
								name="passcode_3"
								onChange={handleChange}
								error={touched.passcode_3 && Boolean(errors.passcode_3)}
								inputProps={{ 
									maxLength: 1,
									style: { textAlign: 'center' },
									placeholder: "#"
								}}
							></TextField>
						</Grid>
						<Grid item xs={2}>
							<TextField 
								size="small" 
								name="passcode_4"
								onChange={handleChange}
								error={touched.passcode_4 && Boolean(errors.passcode_4)}
								inputProps={{ 
									maxLength: 1,
									style: { textAlign: 'center' },
									placeholder: "#"
								}}
							></TextField>
						</Grid>
						<Grid item xs={2}>
							<TextField 
								size="small" 
								name="passcode_5"
								onChange={handleChange}
								error={touched.passcode_5 && Boolean(errors.passcode_5)}
								inputProps={{ 
									maxLength: 1,
									style: { textAlign: 'center' },
									placeholder: "#"
								}}
							></TextField>
						</Grid>
						<Grid item xs={2}>
							<TextField 
								size="small" 
								name="passcode_6"
								onChange={handleChange}
								error={touched.passcode_6 && Boolean(errors.passcode_6)}
								inputProps={{ 
									maxLength: 1,
									style: { textAlign: 'center' },
									placeholder: "#"
								}}
							></TextField>
						</Grid>
					</Grid>

					{result.isError &&
						<Typography color="error" fontSize={12} marginTop={1}>
							{"Invalid OTP. Please try again."}
						</Typography>
					}
					
					<Box marginTop={3}>
						<Button 
							fullWidth
							variant="contained"
							type="submit"
							disabled={result.isLoading}
						>
							{"Validate"}
						</Button>
					</Box>
				</Form>
			)}
		/>
	)
}

export default IssuerValidationForm