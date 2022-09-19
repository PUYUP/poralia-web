import * as React from "react"
import Head from "next/head"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from '@mui/material/Typography';
import DashboardLayout from "../../components/DashboardLayout"
import RejectionForm from "../../features/rejection/RejectionForm"
import { useRetrieveActivityQuery } from "../../features/activity/Api"

const Share = (props: any) => {
	const { id, action } = props.query
	const { data, isLoading, isSuccess } = useRetrieveActivityQuery(
		{ id: id },
		{ skip: !id }
	)

	return (
		<>
			<Head>
				<title>Share Rejection | Poralia</title>
			</Head>

			<DashboardLayout>
				<Box 
					padding={{
						xs: 1,
						sm: 3,
						md: 4,
					}}
				>
					<Typography variant="h5" marginBottom={.5}>{"Share Rejection"}</Typography>
					<Divider sx={{ marginBottom: 4 }} />
					<RejectionForm id={id} action={action} activity={!isLoading && isSuccess ? data?.[0] : {}} isLoading={isLoading} />
				</Box>
			</DashboardLayout>
		</>
	)
}

Share.getInitialProps = ({ query }: any) => {
	return { query }
}

export default Share