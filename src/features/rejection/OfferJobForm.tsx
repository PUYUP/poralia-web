import * as Yup from 'yup'
import * as React from 'react'
import { Formik, Form } from "formik"
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from "@mui/material/FormControl"
import InputAdornment from '@mui/material/InputAdornment'
import WorkIcon from '@mui/icons-material/Work';
import { useCreateActivityMutation } from "../activity/Api"
import { useSelector } from "react-redux"

const OfferJobForm = (props: {
	activity: any,
	onSubmitSuccess?: any,
}) => {
	const account = useSelector((state: any) => state.user.account)
	const [createActivity, status] = useCreateActivityMutation()

	React.useEffect(() => {
		if (status.isSuccess) {
			props.onSubmitSuccess(status.data[0])
		}
	}, [status])

	return (
		<Formik
			initialValues={{
				summary: '',
			}}
			validationSchema={Yup.object({
				summary: Yup.string().required('Required field'),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				const payload = {
					primary_item_id: props.activity.id,
					// secondary_item_id: props.activity.id,
					context: 'edit',
					user_id: account?.id,
					component: 'activity',
					type: 'activity_comment',
					content: values.summary,
					secondary_type: 'job_offered'
				}

				await createActivity(payload)
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
							minRows={3}
							maxRows={300}
							name="summary"
							label={"Offering Summary"}
							placeholder={"Summary about this offer such as position, company name, or ect."}
							size={'small'}
							required={true}
							value={values.summary}
							onChange={handleChange}
							error={touched.summary && Boolean(errors.summary)}
							helperText={touched.summary && errors.summary?.toLocaleString()}
						/>
					</FormControl>

					<Box textAlign={'center'}>
						<Button 
							type="submit" 
							variant="contained" 
							sx={{ borderRadius: 6 }}
							disabled={status.isLoading}
						>Send offer</Button>
					</Box>
				</Form>
			)}
		</Formik>
	)
}

export default OfferJobForm