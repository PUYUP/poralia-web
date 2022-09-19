import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Head from 'next/head'
import DashboardLayout from "../../components/DashboardLayout"
import { useRetrieveMeQuery } from "../../features/user/Api"
import AccountCard from '../../features/user/AccountCard'
import { useSession } from 'next-auth/react'
import ActivityList from '../../features/user/ActivityList'

const MyAccount = () => {
	const { data: session } = useSession()
	const { data, isLoading, isSuccess } = useRetrieveMeQuery('me')

	return (
		<>
			<Head>
				<title>{"My Account | Poralia"}</title>
			</Head>
			
			<DashboardLayout>
				{isLoading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</Box>
				) : (
					<AccountCard user={data} isMe={true} />
				)}

				{session && <ActivityList userId={session?.user?.id} />}
			</DashboardLayout>
		</>
	)
}

export default MyAccount