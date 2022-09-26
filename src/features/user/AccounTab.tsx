import * as React from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useSession } from 'next-auth/react'

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
  
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box paddingTop={3}>{children}</Box>
			)}
		</div>
	);
}

  
function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const AccountTab = (props: {
	user: any,
	section?: string,
}) => {
	const router = useRouter()
	const { data: session } = useSession()
	const [value, setValue] = React.useState(0)

	// @ts-ignore
	const isMe = session.user.id == props.user.id

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);

		let section = ''

		switch (newValue) {
			case 0:
				section = '/rejection'
				break;
			case 1:
				section = '/experience'
				break;
			case 2:
				section = '/application'
				break;
			default:
				// pass
		}

		router.push(`/${props.user.username}${section}`)
	}

	React.useEffect(() => {
		switch (props.section) {
			case 'rejection':
				setValue(0)
				break;
			case 'experience':
				setValue(1)
				break;
			case 'application':
				setValue(2)
				break;
			default:
				// pass
		}
	}, [props.section])
	
	return (
		<Box sx={{ width: '100%', marginTop: 3 }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Rejection" {...a11yProps(0)} />
					<Tab label="Experience" {...a11yProps(1)} />

					{isMe && (
						<Tab label="Application" {...a11yProps(2)} />
					)}
				</Tabs>
			</Box>
		</Box>
	)
}

export default AccountTab