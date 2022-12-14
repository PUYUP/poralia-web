import * as Yup from "yup"
import { Form, Formik } from "formik"
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkIcon from '@mui/icons-material/Work';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useRouter } from "next/router";
import { useCreateApplicationMutation, useUpdateApplicationMutation } from "../activity/Api";
import { useEffect } from 'react'
import { useSelector } from "react-redux";

const ApplicationForm = (props: {
	id: number,
	action: string,
	isLoading: boolean,
	activity: any,
}) => {
	const router = useRouter()
	const me = useSelector((state: any) => state.user.account)
	const [createApplication, createResult] = useCreateApplicationMutation()
	const [updateApplication, updateResult] = useUpdateApplicationMutation()
	const { secondary_item }: any = props.activity

	useEffect(() => {
		if (createResult.isSuccess || updateResult.isSuccess) {
			router.replace(`/${me.username}/application`)
		}
	}, [createResult, updateResult])

	return (
		<>
			<Box sx={{ position: 'relative' }}>
				{props.isLoading && (
					<Box sx={{ 
						display: 'flex', 
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						backgroundColor: 'rgba(255, 255, 255, .75)',
						top: '-15px',
						right: '-15px',
						bottom: '-15px',
						left: '-15px',
						zIndex: 9,
					}}>
						<CircularProgress />
						<Typography marginLeft={2}>{"Memuat data..."}</Typography>
					</Box>
				)}

				<Formik
					enableReinitialize={true}
					initialValues={{
						applyingIn: secondary_item ? secondary_item.meta.applying_in : '',
						jobTitle: secondary_item ? secondary_item.title.rendered : '',
						appliedAt: secondary_item ? secondary_item.meta.applied_at : '',
					}}
					validationSchema={Yup.object({
						applyingIn: Yup.string()
							.required(),
						jobTitle: Yup.string()
							.required(),
						appliedAt: Yup.date(),
					})}
					onSubmit={async (values, { setSubmitting}) => {
						const postData = {
							title: values.jobTitle,
							content: '',
							status: 'publish',
							meta: {
								applying_in: values.applyingIn,
								applied_at: values.appliedAt,
								privacy: 'private',
								status: props.id ? secondary_item.meta?.status : 'ongoing',
							}
						}

						if (props.id && props.action === 'edit') {
							await updateApplication({id: secondary_item?.id, ...postData})
						} else {
							await createApplication({...postData})
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						setFieldValue,
					}) => (
						<Form>
							<FormControl 
								fullWidth 
								sx={{ 
									marginBottom: {
										xs: 3,
										sm: 4,
									} 
								}}
							>
								<TextField
									name="jobTitle"
									label={"Job Title"}
									placeholder={"eg: Marketing Officer"}
									required={true}
									value={values.jobTitle}
									onChange={handleChange}
									size={'small'}
									error={touched.jobTitle && Boolean(errors.jobTitle)}
									helperText={touched.jobTitle && errors.jobTitle?.toLocaleString()}
									InputProps={{
										startAdornment: <InputAdornment position="start"><WorkIcon /></InputAdornment>,
									}}
								/>
							</FormControl>

							<FormControl 
								fullWidth 
								sx={{ 
									marginBottom: {
										xs: 3,
										sm: 4,
									} 
								}}
							>
								<TextField
									name="applyingIn"
									label={"Applying In"}
									placeholder={"Company name, workplace name, etc"}
									size={'small'}
									required={true}
									value={values.applyingIn}
									onChange={handleChange}
									error={touched.applyingIn && Boolean(errors.applyingIn)}
									helperText={touched.applyingIn && errors.applyingIn?.toLocaleString()}
									InputProps={{
										startAdornment: <InputAdornment position="start"><ApartmentIcon /></InputAdornment>,
									}}
								/>
							</FormControl>

							<Grid container spacing={{
								xs: 0,
								sm: 2
							}}>
								<Grid item xs={12} sm={12}>
									<FormControl 
										fullWidth 
										sx={{ 
											marginBottom: {
												xs: 3,
												sm: 4,
											} 
										}}
									>
										<MobileDatePicker
											label={"Applied At"}
											inputFormat="MM/DD/YYYY"
											value={values.appliedAt}
											onChange={(value: any) => {
												setFieldValue('appliedAt', value)
											}}
											renderInput={(params) => <TextField 
												{...params} 
												name="appliedAt"
												size={'small'}
												error={touched.appliedAt && Boolean(errors.appliedAt)}
												helperText={touched.appliedAt && errors.appliedAt?.toLocaleString()}
												InputProps={{
													placeholder: "MM/DD/YYY",
													startAdornment: <InputAdornment position="start"><EventNoteIcon /></InputAdornment>,
												}}
											/>}
										/>
									</FormControl>
								</Grid>
							</Grid>

							<Box>
								<Button 
									type="submit" 
									variant="contained" 
									disabled={updateResult.isLoading || createResult.isLoading}
									sx={{ borderRadius: 6 }}
								>
									{props.action === 'edit' ? 'Update My Application' : 'Save My Application'}
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	)
}

export default ApplicationForm