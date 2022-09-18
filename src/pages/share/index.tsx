import * as React from "react"
import Head from "next/head"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import DashboardLayout from "../../components/DashboardLayout"
import RejectionForm from "../../features/rejection/RejectionForm"
import { useRetrieveActivityQuery } from "../../features/activity/Api"

const Share = (props: any) => {
	const { id, action } = props.query
	// @ts-ignore
	const { data, isLoading, isSuccess } = id ? useRetrieveActivityQuery({ id: id }) : { 'data': null, isLoading: false, isSuccess: false }

	return (
		<>
			<Head>
				<title>Share Rejection | Poralia</title>
			</Head>

			<DashboardLayout>
				<Card sx={{ marginBottom: 3, borderRadius: 4, padding: 2 }}>
					<CardContent>
						<RejectionForm id={id} action={action} activity={!isLoading && isSuccess ? data?.[0] : {}} isLoading={isLoading} />
					</CardContent>
				</Card>
			</DashboardLayout>
		</>
	)
}

Share.getInitialProps = ({ query }: any) => {
	return { query }
}

export default Share