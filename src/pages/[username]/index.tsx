import * as React from 'react';
import Head from 'next/head'
import Link from "next/link"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import { useRetrieveUserQuery } from "../../features/user/Api"
import AccountLayout from '../../components/AccountLayout';
import ActivityList from '../../features/activity/ActivityList';
import { useSession } from 'next-auth/react';

const Account = (props: any) => {
	const { username } = props.query
	const { data: session } = useSession()
	const { data: user } = useRetrieveUserQuery(username)

	return (
		<>
			<Head>
				<title>{ username }</title>
			</Head>

			<AccountLayout query={props.query}>
				{// @ts-ignore
				user?.id == session?.user?.id &&
					<Box marginBottom={4}>
						<Typography marginBottom={1}>{"Got rejection? Feel free to save it. Let recruiter got you with different way."}</Typography>

						<Link href="/editor/rejection">
							<Button variant="contained" sx={{ borderRadius: 10, width: 190 }} startIcon={<RateReviewOutlinedIcon />}>
								{"Save New Rejection"}
							</Button>
						</Link>
					</Box>
				}

				<ActivityList query={{ type: 'new_rejection', username: username }} />
			</AccountLayout>
		</>
	)
}

Account.getInitialProps = ({ query, session }: any) => {
	return { query }
}

export default Account