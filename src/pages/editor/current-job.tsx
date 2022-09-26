import * as React from "react"
import Head from "next/head"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import DashboardLayout from "../../components/DashboardLayout"
import CurrentJobForm from "../../features/currentJob/CurrentJobForm"
import { useRetrieveActivityQuery } from "../../features/activity/Api"

const CurrentJobEditor = (props: any) => {
	const { id, action } = props.query
	const { data, isLoading, isSuccess } = useRetrieveActivityQuery(
		{ id: id },
		{ skip: !id }
	)

	return (
		<>
			<Head>
				<title>Save Current Job</title>
			</Head>

			<DashboardLayout>
				<Box 
					padding={{
						xs: 1,
						sm: 3,
						md: 4,
					}}
				>
					<Typography variant="h5" marginBottom={.5}>{"Save Current Job"}</Typography>
					<Divider sx={{ marginBottom: 4 }} />
					<CurrentJobForm id={id} action={action} activity={!isLoading && isSuccess ? data?.[0] : {}} isLoading={isLoading} />
				</Box>
			</DashboardLayout>
		</>
	)
}

CurrentJobEditor.getInitialProps = ({ query }: any) => {
	return { query }
}

export default CurrentJobEditor