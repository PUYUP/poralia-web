import * as React from 'react';
import moment from "moment";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSession } from "next-auth/react";
import { yellow } from '@mui/material/colors';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDeleteActivityMutation, useFavoriteActivityMutation } from '../activity/Api';
import Swal from 'sweetalert2'


const OfferingItem = (props: any) => {
	const router = useRouter()
	const { data: session } = useSession()
	const { author } = props

	const avatar = author.simple_local_avatar ? author.simple_local_avatar?.[96] : props?.user_avatar?.['thumb']

	const goToUser = (username: string) => {
		router.push(username)
	}

	return (
		<Card sx={{ 
			marginBottom: 3, 
			borderRadius: 4, 
			backgroundColor: () => {
				// @ts-ignore
				return session?.user?.id === author.id ? '#fff' : '#fff' 
			}
		}}>
			<CardContent>
				<Box marginBottom={{
					xs: 1.5,
					sm: 2
				}}>
					<ListItem disablePadding={true}>
						<ListItemAvatar 
							onClick={() => goToUser(author.username)}
							sx={{ cursor: 'pointer' }}
						>
							<Avatar src={avatar}>
								<ImageIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText 
							secondary={moment(props.date_gmt).format('lll')} 
							onClick={() => goToUser(author.username)}
							sx={{ cursor: 'pointer' }}
						>
							<Typography fontWeight={700}>{author.name}</Typography>
						</ListItemText>
					</ListItem>
				</Box>
				
				<Box>
					<Typography 
						fontSize={14} 
						component='div' 
						dangerouslySetInnerHTML={{__html: props.content.rendered ? props.content.rendered : '-'}}
						sx={{
							[`> p:last-child`]: {
								marginBottom: 0
							}
						}}
					></Typography>
				</Box>
			</CardContent>
		</Card>
	)
}

export default OfferingItem