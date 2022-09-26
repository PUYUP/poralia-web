import * as React from "react"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import DashboardHeader from "./DashboardHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRetrieveMeQuery } from "../features/user/Api";
import { useAppDispatch } from "../lib/hooks";
import { setAccount } from "../features/user/Slice";

interface Props {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/signin')
		}
	})

	// get current loggedin user
	const { data: me, isSuccess } = useRetrieveMeQuery('me')

	// then set to state
	React.useEffect(() => {
		if (isSuccess) {
			dispatch(setAccount(me))
		}
	}, [isSuccess])
	
	return (
		<>
			<DashboardHeader />

			<Container maxWidth="sm">
				<Box 
					sx={{
						paddingTop: {
							xs: 10,
							sm: 12,
							md: 15,
						},
						paddingBottom: {
							xs: 10,
							sm: 12,
							md: 15,
						}
					}}
				>
					{(status !== 'loading' && status === 'authenticated') && (
						<>{children}</>
					)}

					{status === 'loading' && (
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<CircularProgress />
						</Box>
					)}
				</Box>
			</Container>
		</>
	)
}

export default DashboardLayout