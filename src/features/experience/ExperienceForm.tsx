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
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useRouter } from "next/router";
import { useCreateExperienceMutation, useUpdateExperienceMutation, useUpdateApplicationMutation } from "../activity/Api";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

const ExperienceForm = (props: {
	id: number,
	action: string,
	isLoading: boolean,
	activity: any,
}) => {
	const router = useRouter()
	const [createExperience, createResult] = useCreateExperienceMutation()
	const [updateExperience, updateResult] = useUpdateExperienceMutation()
	const [updateApplication, updateApplicationResult] = useUpdateApplicationMutation()

	const me = useSelector((state: any) => state.user.account)
	const [privacyChecked, setPrivacyChecked] = useState(false)
	const { secondary_item }: any = props.activity
	const { meta } = secondary_item || { meta: undefined }
	const lastStage = meta?.stages && meta?.stages.length > 0 ? meta?.stages[0].summary : meta?.last_stage

	useEffect(() => {
		if (createResult.isSuccess || updateResult.isSuccess) {
			router.replace(`/${me.username}/experience`)
		}
	}, [createResult, updateResult])

	useEffect(() => {
		if (secondary_item) {
			setPrivacyChecked(secondary_item.meta.privacy == 'private' ? true : false)
		}
	}, [secondary_item])

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
						startedAt: secondary_item ? secondary_item.meta.applied_at : '',
						finishedAt: secondary_item ? secondary_item.meta.accepted_at : '',
						story: secondary_item ? secondary_item.content.plain : '',
					}}
					validationSchema={Yup.object({
						applyingIn: Yup.string()
							.required('Required field'),
						jobTitle: Yup.string()
							.required('Required field'),
						startedAt: Yup.date(),
						finishedAt: Yup.date(),
						story: Yup.string(),
					})}
					onSubmit={async (values, { setSubmitting}) => {
						const postData = {
							title: values.jobTitle,
							content: values.story,
							status: 'publish',
							meta: {
								applying_in: values.applyingIn,
								started_at: values.startedAt,
								finished_at: values.finishedAt,
								privacy: 'public',
							}
						}

						if (props.id && props.action === 'edit') {
							await updateExperience({id: secondary_item?.id, ...postData})
						} else {
							await createExperience({...postData})

							// Update application status
							if (secondary_item) {
								await updateApplication({
									id: secondary_item.id, 
									meta: {
										status: 'accepted'
									}
								})
							}
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
								<Grid item xs={12} sm={6}>
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
											label={"Started At"}
											inputFormat="MM/DD/YYYY"
											value={values.startedAt}
											onChange={(value: any) => {
												setFieldValue('startedAt', value)
											}}
											renderInput={(params) => <TextField 
												{...params} 
												name="startedAt"
												size={'small'}
												error={touched.startedAt && Boolean(errors.startedAt)}
												helperText={touched.startedAt && errors.startedAt?.toLocaleString()}
												InputProps={{
													placeholder: "MM/DD/YYY",
													startAdornment: <InputAdornment position="start"><EventNoteIcon /></InputAdornment>,
												}}
											/>}
										/>
									</FormControl>
								</Grid>
								
								<Grid item xs={12} sm={6}>
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
											label={"Finished At"}
											inputFormat="MM/DD/YYYY"
											value={values.finishedAt}
											onChange={(value: any) => {
												setFieldValue('finishedAt', value)
											}}
											renderInput={(params) => <TextField 
												{...params} 
												name="finishedAt"
												size={'small'}
												error={touched.finishedAt && Boolean(errors.finishedAt)}
												helperText={touched.finishedAt && errors.finishedAt?.toLocaleString()}
												InputProps={{
													placeholder: "MM/DD/YYY",
													startAdornment: <InputAdornment position="start"><EventNoteIcon /></InputAdornment>,
												}}
											/>}
										/>
									</FormControl>
								</Grid>
							</Grid>

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
									multiline
									minRows={3}
									maxRows={300}
									name="story"
									label={"Experience Story"}
									placeholder={"Your story about this experience. Feel free to tell us."}
									size={'small'}
									value={values.story}
									onChange={handleChange}
									error={touched.story && Boolean(errors.story)}
									helperText={touched.story && errors.story?.toLocaleString()}
								/>
							</FormControl>

							<Box>
								<Button 
									type="submit" 
									variant="contained" 
									disabled={updateResult.isLoading || createResult.isLoading}
									sx={{ borderRadius: 6 }}
								>
									{props.action === 'edit' ? 'Update Experience' : 'Save Experience'}
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	)
}

export default ExperienceForm