import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import { useSession } from "next-auth/react"
import Head from "next/head"
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
				{
					// @ts-ignore
					session && <ApplicationList userId={session?.user?.id} />
				}
			</DashboardLayout>
		</>
	)
}

export default MyApplication