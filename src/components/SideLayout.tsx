import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

interface Props {
	children: React.ReactNode
}

const SideLayout = ({ children }: Props) => {
	const router = useRouter()
	const { status } = useSession()
	
	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/')
		}
	}, [status])

	return (
		<>{children}</>
	)
}

export default SideLayout