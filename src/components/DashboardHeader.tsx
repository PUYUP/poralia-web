import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WorkOffOutlinedIcon from '@mui/icons-material/WorkOffOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import BadgeIcon from '@mui/icons-material/Badge';
import { useSelector } from 'react-redux';

const BasicMenu = (props: {
	session: any,
}) => {
	const account = useSelector((state: any) => state.user.account)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	  	setAnchorEl(event.currentTarget);
	}
	const handleClose = () => {
	  	setAnchorEl(null);
	}

	return (
		<>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				color="inherit"
				onClick={handleClick}
				sx={{ width: '80px', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2' }}
			>
				{"My account"}
			</Button>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>	
				<Link href={`/${account?.username}/application`}>
					<MenuItem>
						<ListItemIcon>
							<WorkHistoryOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>{"Application"}</ListItemText>
					</MenuItem>
				</Link>
				<Link href={`/${account?.username}/rejection`}>
					<MenuItem>
						<ListItemIcon>
							<WorkOffOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>{"Rejection"}</ListItemText>
					</MenuItem>
				</Link>
				<Link href={`/${account?.username}/experience`}>
					<MenuItem>
						<ListItemIcon>
							<SchoolOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>{"Experience"}</ListItemText>
					</MenuItem>
				</Link>
				<Link href={`/${account?.username}`}>
					<MenuItem>
						<ListItemIcon>
							<PersonIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>{"Profile"}</ListItemText>
					</MenuItem>
				</Link>
				<MenuItem onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL })}>
					<ListItemIcon>
						<ExitToAppIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>{"Sign out"}</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
}

const DashboardHeader = (props: any) => {
	const router = useRouter()
	const { data: session } = useSession()

	const onSignOut = async () => {
		const data = await signOut({redirect: false})
		router.push('/signin')
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar sx={{ justifyContent: 'space-between'}}>
					{/*
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					*/}

					<Box 
						order={{
							xs: 1,
							sm: 1,
						}}
					>
						<Typography variant="h6" component="div" paddingLeft={1}>
							<Link href="/rejection">
								<a>{"Poralia"}</a>
							</Link>
						</Typography>
					</Box>
						
					<Box order={{
						xs: 2,
						sm: 2,
					}}>
						<Link href="/rejection">
							<a>
								<Image src={'/poralia-logo-white.png'} width="34" height="34" />
							</a>
						</Link>
					</Box>
					
					<Box order={3}>
						<BasicMenu session={session} me={props.me} />
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default DashboardHeader