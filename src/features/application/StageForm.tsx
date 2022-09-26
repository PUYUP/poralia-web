import * as React from 'react'
import * as Yup from "yup"
import Swal from "sweetalert2"
import { Form, Formik } from "formik"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import InputAdornment from '@mui/material/InputAdornment'
import EventNoteIcon from '@mui/icons-material/EventNote'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useUpdateApplicationMutation } from "../activity/Api"

const StageForm = (props: any) => {
	const [updateApplication, status] = useUpdateApplicationMutation()
	const [selectedStage, setSelectedStage] = React.useState<any>()

	const onDelete = () => {
		Swal.fire({
			title: 'Are you sure want delete this item?',
			showDenyButton: false,
			showCancelButton: true,
			confirmButtonText: 'Sure, delete'
		}).then(async (result) => {
			if (result.isConfirmed) {
				const stageIndex = props?.stage_index
				const stages = [...props.secondary_item.meta.stages]

				// remove here
				stages.splice(stageIndex, 1)

				const payload = {
					id: props.secondary_item.id,
					meta: {
						stages: stages
					}
				}

				await updateApplication(payload)
			}
		})
	}

	React.useEffect(() => {
		if (status.isSuccess) {
			props.onSuccess()
		}
	}, [status])

	React.useEffect(() => {
		if (props.secondary_item?.meta?.stages && props.stage_index != undefined) {
			setSelectedStage(props.secondary_item?.meta?.stages[props.stage_index])
		}
	}, [props.secondary_item])

	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={{
					date: selectedStage ? selectedStage?.date : '',
					summary: selectedStage ? selectedStage?.summary : '',
				}}
				validationSchema={Yup.object({
					date: Yup.date()
						.required(),
					summary: Yup.string()
						.required(),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					const stageIndex = props?.stage_index
					let stages = [...props.secondary_item.meta.stages]

					// If has stage_index edit on matching stage
					if (stageIndex != undefined) {
						// get and update stage by index
						let stage = {
							...stages[stageIndex],
							...values,
						}

						stages[stageIndex] = stage
					} else {
						// added new stage
						const newStage = {
							...values,
							id: new Date().getTime(),
							created_at: new Date().toISOString(),
						}
						
						stages = [newStage, ...stages]
					}

					const payload = {
						id: props.secondary_item.id,
						meta: {
							stages: stages
						}
					}
					
					await updateApplication(payload)
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
							<MobileDatePicker
								label={"Happen At"}
								inputFormat="MM/DD/YYYY"
								value={values.date}
								onChange={(value: any) => {
									setFieldValue('date', value)
								}}
								renderInput={(params) => <TextField 
									{...params} 
									name="date"
									required={true}
									size={'small'}
									error={touched.date && Boolean(errors.date)}
									helperText={touched.date && errors.date?.toLocaleString()}
									InputProps={{
										placeholder: "MM/DD/YYY",
										startAdornment: <InputAdornment position="start"><EventNoteIcon /></InputAdornment>,
									}}
								/>}
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
								maxRows={300}
								minRows={3}
								name="summary"
								label={"Summary"}
								required={true}
								placeholder={"A short description what happen in this stage."}
								size={'small'}
								value={values.summary}
								onChange={handleChange}
								error={touched.summary && Boolean(errors.summary)}
								helperText={touched.summary && errors.summary?.toLocaleString()}
							/>
						</FormControl>

						<Box sx={{ textAlign: 'center', marginBottom: 2 }}>
							{props?.stage_index != undefined &&
								<Button type="button" onClick={onDelete} variant="text" color="error" sx={{ borderRadius: 5, marginRight: 6 }} disabled={status.isLoading}>
									Delete
								</Button>
							}

							<Button type="submit" variant="contained" sx={{ borderRadius: 5 }} disabled={status.isLoading}>
								Save Stage
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default StageForm