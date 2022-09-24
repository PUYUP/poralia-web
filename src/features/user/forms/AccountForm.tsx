import * as Yup from "yup"
import { Form, Formik } from "formik"
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import Button from '@mui/material/Button'
import { useUpdateUserMutation } from "../Api"
import { useEffect, useState } from "react"

const AccountForm = (props: {
	user: any,
	onSubmited?: any,
}) => {
	const [updateUser, result] = useUpdateUserMutation()
	const [usernameError, setUsernameError] = useState<boolean>(false)
	const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>('')

	useEffect(() => {
		if (result.isSuccess) {
			props.onSubmited(true)
		} else if (result.isError) {
			// @ts-ignore
			if (result.error?.data?.code === 'rest_user_username_exist') {
				setUsernameError(true)
				// @ts-ignore
				setUsernameErrorMsg(result?.error?.data?.message)
			}
		}
	}, [result])
 	
	return (
		<>
			<Formik 
				initialValues={{
					name: props.user?.name,
					username: props.user?.username,
					description: props.user?.description,
				}}
				validationSchema={Yup.object({
					name: Yup.string()
						.required(),
					username: Yup.string()
						.required(),
					description: Yup.string()
				})}
				onSubmit={async ( values, { setSubmitting }) => {
					await updateUser({
						id: props.user?.id, 
						body: values
					})
				}}
				render={({ handleChange, touched, values, errors, isSubmitting }) => (
					<Form>
						<FormControl fullWidth sx={{ mb: 3}}>
							<TextField
								label="Username"
								size="small"
								name="username"
								autoFocus
								required={true}
								onChange={handleChange}
								value={values.username}
								error={touched.username && Boolean(errors.username) || usernameError}
								helperText={touched.username && errors.username?.toLocaleString() || usernameError ? usernameErrorMsg : ''}
							/>
						</FormControl>

						<FormControl fullWidth sx={{ mb: 3}}>
							<TextField
								label="Your name"
								size="small"
								name="name"
								required={true}
								autoComplete="name"
								autoFocus
								onChange={handleChange}
								value={values.name}
								error={touched.name && Boolean(errors.name)}
								helperText={touched.name && errors.name?.toLocaleString()}
							/>
						</FormControl>

						<FormControl fullWidth sx={{ mb: 3}}>
							<TextField
								multiline
								minRows={3}
								maxRows={150}
								label="About me"
								name="description"
								onChange={handleChange}
								value={values.description}
								error={touched.description && Boolean(errors.description)}
								helperText={touched.description && errors.description?.toLocaleString()}
							/>
						</FormControl>

						<Button type="submit" variant="contained" sx={{ borderRadius: 5 }} disabled={result.isLoading}>
							{"Save account"}
						</Button>
					</Form>
				)}
			/>
		</>
	)
}

export default AccountForm