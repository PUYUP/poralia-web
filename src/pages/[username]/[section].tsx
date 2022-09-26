import Head from 'next/head'
import Link from "next/link"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import AccountLayout from '../../components/AccountLayout'
import ActivityList from '../../features/activity/ActivityList'
import { useSession } from 'next-auth/react'
import { useRetrieveUserQuery } from '../../features/user/Api'
import ApplicationList from '../../features/application/ApplicationList'
import CurrentJobList from '../../features/currentJob/CurrentJobList'

const AccountSection = (props: {
	query: any,
	section: string,
}) => {
	const { data: session } = useSession()
	const { username, section } = props.query
	const { data: user } = useRetrieveUserQuery(username)

	return (
		<>
			<Head>
				<title>{ username }</title>
			</Head>

			<AccountLayout query={props.query}>
				{section == 'application' && (
					<>
						<Box marginBottom={4}>
							<Typography marginBottom={1}>{"Never forget where your applied. Save and track it by yourself."}</Typography>

							<Link href="/editor/application">
								<Button variant="contained" sx={{ borderRadius: 10 }} startIcon={<RateReviewOutlinedIcon />}>
									{"Save New Application"}
								</Button>
							</Link>
						</Box>
						<ApplicationList user={user} />
					</>
				)}

				{section == 'rejection' && (
					<>
						{// @ts-ignore
						user?.id == session?.user?.id &&
							<Box marginBottom={4}>
								<Typography marginBottom={1}>{"Got rejection? Feel free to save it. Let recruiter got you with different way."}</Typography>

								<Link href="/editor/rejection">
									<Button variant="contained" sx={{ borderRadius: 10 }} startIcon={<RateReviewOutlinedIcon />}>
										{"Save New Rejection"}
									</Button>
								</Link>
							</Box>
						}
						<ActivityList query={{ type: 'new_rejection', username: username }} />
					</>
				)}

				{section == 'current-job' && 
					<CurrentJobList user={user} />
				}

				{section == 'retired' && 
					<ActivityList query={{ type: 'new_retired', username: username }} />
				}
			</AccountLayout>
		</>
	)
}

AccountSection.getInitialProps = ({ query, session }: any) => {
	return { query }
}

export default AccountSection