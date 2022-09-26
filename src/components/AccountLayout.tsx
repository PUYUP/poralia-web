import * as React from "react"
import Box from '@mui/material/Box';
import DashboardLayout from "./DashboardLayout";
import AccountCard from "../features/user/AccountCard";
import CircularProgress from '@mui/material/CircularProgress'
import { useRetrieveUserQuery } from "../features/user/Api";
import AccountTab from "../features/user/AccounTab";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "../lib/hooks";

interface Props {
	children: React.ReactNode,
	query: any
}

const AccountLayout = ({ children, query }: Props) => {
	const { data: session } = useSession()
	const { username } = query
	const { data: user, isLoading, isSuccess } = useRetrieveUserQuery(username)

	// React.useEffect(() => {
	// 	if (isSuccess && user) {
	// 		console.log(username)
	// 	}
	// }, [isSuccess, user])

	return (
		<>
			<DashboardLayout>
				{isLoading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</Box>
				) : (
					<>
						<AccountCard 
							{...user} 
							isMe={
								// @ts-ignore
								session?.user?.id == user.id
							} 
						/>

						<AccountTab user={user} section={query.section} />
						<Box>{children}</Box>
					</>
				)}
			</DashboardLayout>
		</>
	)
}

export default AccountLayout