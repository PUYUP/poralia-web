import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from '@mui/material/Grid'
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import Divider from '@mui/material/Divider'
import { useSession } from "next-auth/react"
import Typography from "@mui/material/Typography"
import Head from "next/head"
import Link from "next/link"
import DashboardLayout from "../../components/DashboardLayout"
import ApplicationList from "../../features/application/ApplicationList"

const MyApplication = () => {
	const { data: session } = useSession()
	
	return (
		<>
			<Head>
				<title>{"My Applications | Poralia"}</title>
			</Head>
			
			<DashboardLayout>
				<Grid container marginBottom={1.5} alignItems={'center'}>
					<Grid item xs={7}>
						<Typography fontSize={18}>{"My Applications History"}</Typography>
					</Grid>

					<Grid item xs={5} textAlign={'right'}>
						<Link href="/share/application">
							<Button variant="outlined" sx={{ borderRadius: 10 }} startIcon={<WorkHistoryIcon />}>
								{"Create New"}
							</Button>
						</Link>
					</Grid>
				</Grid>

				<Divider sx={{ marginBottom: 3}} />

				{
					// @ts-ignore
					session && <ApplicationList userId={session?.user?.id} />
				}
			</DashboardLayout>
		</>
	)
}

export default MyApplication