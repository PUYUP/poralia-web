import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Head from 'next/head'
import DashboardLayout from "../components/DashboardLayout"
import AccountCard from '../features/user/AccountCard'
import ActivityList from '../features/user/ActivityList'
import { useRetrieveUserQuery } from "../features/user/Api"

const Account = (props: any) => {
	const { data, isLoading, isSuccess } = useRetrieveUserQuery(props.query.slug)

	return (
		<>
			<Head>
				<title>{isSuccess ? data.username : 'Loading...'} | Poralia</title>
			</Head>

			<DashboardLayout>
				{isLoading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</Box>
				) : (
					<>
						<AccountCard user={data} isMe={false} />
						<ActivityList userId={data.id} />
					</>
				)}
			</DashboardLayout>
		</>
	)
}

Account.getInitialProps = ({ query }: any) => {
	return { query }
}

export default Account