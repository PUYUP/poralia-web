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
import Checkbox from '@mui/material/Checkbox';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import Alert from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useRouter } from "next/router";
import { useCreateRejectionMutation, useUpdateRejectionMutation, useUpdateApplicationMutation } from "../activity/Api";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

const RejectionForm = (props: {
	id: number,
	action: string,
	isLoading: boolean,
	activity: any,
}) => {
	const router = useRouter()
	const [createRejection, createResult] = useCreateRejectionMutation()
	const [updateRejection, updateResult] = useUpdateRejectionMutation()
	const [updateApplication, updateApplicationResult] = useUpdateApplicationMutation()

	const me = useSelector((state: any) => state.user.account)
	const [privacyChecked, setPrivacyChecked] = useState(false)
	const { secondary_item }: any = props.activity
	const { meta } = secondary_item || { meta: undefined }
	const lastStage = meta?.stages && meta?.stages.length > 0 ? meta?.stages[0].summary : meta?.last_stage

	const handlePrivacyChange = (event: any) => {
		setPrivacyChecked(event.target.checked)
	}

	useEffect(() => {
		if (createResult.isSuccess || updateResult.isSuccess) {
			router.replace(`/${me.username}/rejection`)
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
						appliedAt: secondary_item ? secondary_item.meta.applied_at : '',
						rejectedAt: secondary_item ? secondary_item.meta.rejected_at : '',
						// rejectionCount: secondary_item ? secondary_item.meta.rejection_count : '',
						lastStage: lastStage,
						method: secondary_item ? secondary_item.meta.method : '',
						story: secondary_item ? secondary_item.content.plain : '',
						privacy: secondary_item ? secondary_item.meta.privacy : 'private',
					}}
					validationSchema={Yup.object({
						applyingIn: Yup.string()
							.required('Required field'),
						jobTitle: Yup.string()
							.required('Required field'),
						appliedAt: Yup.date(),
						rejectedAt: Yup.date(),
						// rejectionCount: Yup.number(),
						lastStage: Yup.string(),
						method: Yup.string(),
						story: Yup.string(),
						privacy: Yup.string()
							.required(),
					})}
					onSubmit={async (values, { setSubmitting}) => {
						const postData = {
							title: values.jobTitle,
							content: values.story,
							status: 'publish',
							meta: {
								applying_in: values.applyingIn,
								applied_at: values.appliedAt,
								rejected_at: values.rejectedAt,
								// rejection_count: values.rejectionCount,
								last_stage: values.lastStage,
								method: values.method,
								privacy: privacyChecked ? 'private' : 'public',
							}
						}

						if (props.id && props.action === 'edit') {
							await updateRejection({id: secondary_item?.id, ...postData})
						} else {
							await createRejection({...postData})

							// Update application status
							if (secondary_item) {
								await updateApplication({
									id: secondary_item.id, 
									meta: {
										status: 'rejected'
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
											label={"Rejected At"}
											inputFormat="MM/DD/YYYY"
											value={values.rejectedAt}
											onChange={(value: any) => {
												setFieldValue('rejectedAt', value)
											}}
											renderInput={(params) => <TextField 
												{...params} 
												name="rejectedAt"
												size={'small'}
												error={touched.rejectedAt && Boolean(errors.rejectedAt)}
												helperText={touched.rejectedAt && errors.rejectedAt?.toLocaleString()}
												InputProps={{
													placeholder: "MM/DD/YYY",
													startAdornment: <InputAdornment position="start"><EventNoteIcon /></InputAdornment>,
												}}
											/>}
										/>
									</FormControl>
								</Grid>
							</Grid>

							<Grid container spacing={{
								xs: 0,
								sm: 2
							}}>
								{/*
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
										<TextField
											name="rejectionCount"
											label={"Total Rejection Until Now"}
											type="number"
											placeholder={"eg: 10"}
											size={'small'}
											value={values.rejectionCount}
											onChange={handleChange}
											error={touched.rejectionCount && Boolean(errors.rejectionCount)}
											helperText={touched.rejectionCount && errors.rejectionCount?.toLocaleString()}
											InputProps={{
												startAdornment: <InputAdornment position="start"><PersonOffIcon /></InputAdornment>,
											}}
										/>
									</FormControl>
								</Grid>
								*/}

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
										<TextField
											name="lastStage"
											label={"Last Stage"}
											placeholder={"eg: Interview"}
											size={'small'}
											value={values.lastStage}
											onChange={handleChange}
											error={touched.lastStage && Boolean(errors.lastStage)}
											helperText={touched.lastStage && errors.lastStage?.toLocaleString()}
											InputProps={{
												startAdornment: <InputAdornment position="start"><RunningWithErrorsIcon /></InputAdornment>,
											}}
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
									name="method"
									label={"Rejection Method"}
									placeholder={"eg: by Phone call"}
									size={'small'}
									value={values.method}
									onChange={handleChange}
									error={touched.method && Boolean(errors.method)}
									helperText={touched.method && errors.method?.toLocaleString()}
									InputProps={{
										startAdornment: <InputAdornment position="start"><ConnectWithoutContactIcon /></InputAdornment>,
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
									multiline
									minRows={3}
									maxRows={300}
									name="story"
									label={"Rejection Story"}
									placeholder={"Your story about this rejection such as how to get this job, recruitment story, etc. Feel free to tell us."}
									size={'small'}
									value={values.story}
									onChange={handleChange}
									error={touched.story && Boolean(errors.story)}
									helperText={touched.story && errors.story?.toLocaleString()}
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
								<FormGroup>
									<Typography>{"Privacy type for this rejection"}</Typography>
									<FormControlLabel 
										control={<Checkbox checked={privacyChecked} />} 
										label="Private" 
										onChange={handlePrivacyChange}
									/>

									{privacyChecked ? (
										<Alert severity="warning">{"Only visible by you and your connections"}</Alert>
									) : (
										<Alert severity="info">{"Visible to everyones"}</Alert>
									)}
								</FormGroup>
							</FormControl>

							<Box>
								<Button 
									type="submit" 
									variant="contained" 
									disabled={updateResult.isLoading || createResult.isLoading}
									sx={{ borderRadius: 6 }}
								>
									{props.action === 'edit' ? 'Update My Rejection' : 'Save My Rejection'}
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	)
}

export default RejectionForm