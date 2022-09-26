import * as React from 'react'
import * as Yup from "yup"
import Swal from "sweetalert2"
import { Form, Formik } from "formik"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useUpdateExperienceMutation } from "../activity/Api"

const AchievementForm = (props: any) => {
	const [updateExperience, status] = useUpdateExperienceMutation()
	const [selectedAchievement, setSelectedAchievement] = React.useState<any>()

	const onDelete = () => {
		Swal.fire({
			title: 'Are you sure want delete this item?',
			showDenyButton: false,
			showCancelButton: true,
			confirmButtonText: 'Sure, delete'
		}).then(async (result) => {
			if (result.isConfirmed) {
				const achievementIndex = props?.achievement_index
				const achievements = [...props.secondary_item.meta.achievements]

				// remove here
				achievements.splice(achievementIndex, 1)

				const payload = {
					id: props.secondary_item.id,
					meta: {
						achievements: achievements
					}
				}

				await updateExperience(payload)
			}
		})
	}

	React.useEffect(() => {
		if (status.isSuccess) {
			props.onSuccess()
		}
	}, [status])

	React.useEffect(() => {
		if (props.secondary_item?.meta?.achievements && props.achievement_index != undefined) {
			setSelectedAchievement(props.secondary_item?.meta?.achievements[props.achievement_index])
		}
	}, [props.secondary_item])

	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={{
					summary: selectedAchievement ? selectedAchievement?.summary : '',
				}}
				validationSchema={Yup.object({
					summary: Yup.string()
						.required(),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					const achievementIndex = props?.achievement_index
					let achievements = [...props.secondary_item.meta.achievements]

					// If has achievement_index edit on matching achievement
					if (achievementIndex != undefined) {
						// get and update achievement by index
						let achievement = {
							...achievements[achievementIndex],
							...values,
						}

						achievements[achievementIndex] = achievement
					} else {
						// added new achievement
						const newAchievement = {
							...values,
							id: new Date().getTime(),
							created_at: new Date().toISOString(),
						}
						
						achievements = [newAchievement, ...achievements]
					}

					const payload = {
						id: props.secondary_item.id,
						meta: {
							achievements: achievements
						}
					}
					
					await updateExperience(payload)
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
								multiline
								maxRows={300}
								minRows={3}
								name="summary"
								label={"Summary"}
								required={true}
								placeholder={"A short description what happen in this achievement."}
								size={'small'}
								value={values.summary}
								onChange={handleChange}
								error={touched.summary && Boolean(errors.summary)}
								helperText={touched.summary && errors.summary?.toLocaleString()}
							/>
						</FormControl>

						<Box sx={{ textAlign: 'center', marginBottom: 2 }}>
							{props?.achievement_index != undefined &&
								<Button type="button" onClick={onDelete} variant="text" color="error" sx={{ borderRadius: 5, marginRight: 6 }} disabled={status.isLoading}>
									Delete
								</Button>
							}

							<Button type="submit" variant="contained" sx={{ borderRadius: 5 }} disabled={status.isLoading}>
								Save Achievement
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default AchievementForm