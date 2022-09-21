import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import { useSession } from "next-auth/react"
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
				<Box marginBottom={4}>
					<Link href="/share/application">
						<Button variant="outlined" sx={{ borderRadius: 10 }} startIcon={<WorkHistoryIcon />}>
							{"Save New Application"}
						</Button>
					</Link>
				</Box>

				{
					// @ts-ignore
					session && <ApplicationList userId={session?.user?.id} />
				}
			</DashboardLayout>
		</>
	)
}

export default MyApplication