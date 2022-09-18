import React from "react"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import DashboardHeader from "./DashboardHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
	const router = useRouter()
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/signin')
		}
	})
	
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