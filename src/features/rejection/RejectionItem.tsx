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
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import BusinessIcon from '@mui/icons-material/Business';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import { useDeleteActivityMutation, useFavoriteActivityMutation } from '../activity/Api';
import Swal from 'sweetalert2'
import { useEffect } from 'react'


const RejectionItem = (props: any) => {
	const { data } = useSession()
	const { author, rejection } = props
	const meta = rejection.meta
	const avatar = author.simple_local_avatar?.[96]
	const [favoriteActivity, favoritedResult] = useFavoriteActivityMutation()
	const [deleteActivity, deletedResult] = useDeleteActivityMutation()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	}

	const onFavorited = async (id: any) => {
		await favoriteActivity(id)
	}

	const onDelete = async (id: any) => {
		handleClose()

		Swal.fire({
			title: 'Are you sure want delete this item?',
			showDenyButton: false,
			showCancelButton: true,
			confirmButtonText: 'Sure'
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
			  	await deleteActivity(id)
			}
		})
	}

	return (
		<Card sx={{ 
			marginBottom: 3, 
			borderRadius: 4, 
			backgroundColor: () => {
				// @ts-ignore
				return data?.user?.id === author.id ? yellow[50] : '#fff' 
			}
		}}>
			<CardContent>
				<Box marginBottom={{
					xs: 1.5,
					sm: 2
				}}>
					<ListItem
						disablePadding={true}
						secondaryAction={(
							<>
								{ // @ts-ignore
								data?.user?.id === author.id && (
									<>
										<IconButton 
											edge="end" 
											aria-label="delete"
											aria-controls={open ? 'basic-menu' : undefined}
											aria-haspopup="true"
											aria-expanded={open ? 'true' : undefined}
											onClick={handleClick}
										>
											<SettingsIcon />
										</IconButton>

										<Menu
											id="basic-menu"
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											MenuListProps={{
												'aria-labelledby': 'basic-button',
											}}
										>
											<Link href={`/share/?id=${props.id}&action=edit`}>
												<MenuItem>
													<ListItemIcon>
														<EditIcon fontSize="small" />
													</ListItemIcon>
													<ListItemText>{"Edit"}</ListItemText>
												</MenuItem>
											</Link>
											<MenuItem onClick={() => onDelete(props.id)}>
												<ListItemIcon>
													<DeleteIcon fontSize="small" />
												</ListItemIcon>
												<ListItemText>{"Delete"}</ListItemText>
											</MenuItem>
										</Menu>
									</>
								)}
							</>
						)}
					>
						<ListItemAvatar>
							<Avatar src={avatar}>
								<ImageIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText secondary={moment(rejection.date_gmt).format('lll')}>
							<Typography fontWeight={700}>{author.name}</Typography>
						</ListItemText>
					</ListItem>
				</Box>

				<Box>
					{ // @ts-ignore
					/*data?.user?.id === author.id && (
						<Chip size="small" color="success" label={`My rejection`} sx={{ marginLeft: 1 }} />
					)*/}

					<Typography marginTop={1}>{rejection.title.rendered}</Typography>

					<Table 
						sx={{
							[`& .${tableCellClasses.root}`]: {
							  	borderBottom: "none",
								padding: '2px 0',
							},
							[`& p`]: {
								marginTop: 0,
								marginBottom: 0,
							},
							[`& p+p`]: {
								marginTop: '5px',
							},
							marginTop: 2
						}}
					>
						<TableBody>
							<TableRow>
								<TableCell width={160}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Total rejection"}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography fontSize={14} color="primary" fontWeight={700}>{`This for ${meta.rejection_count} times`}</Typography>
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell width={160}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Rejected in"}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography fontSize={14} color="primary" fontWeight={700}>{meta.rejected_in ? meta.rejected_in : '-'}</Typography>
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell width={160}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Applied at"}
									</Typography>
								</TableCell>

								<TableCell>{meta.applied_at ? moment(meta.applied_at).format('LL') : '-'}</TableCell>
							</TableRow>

							<TableRow>
								<TableCell width={160}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Rejected at"}
									</Typography>
								</TableCell>

								<TableCell>{meta.rejected_at ? moment(meta.rejected_at).format('LL') : '-'}</TableCell>
							</TableRow>

							<TableRow>
								<TableCell width={160}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Last process stage"}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography fontSize={14}>{meta.last_process ? meta.last_process : '-'}</Typography>
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell width={160}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Method"}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography fontSize={14}>{meta.method ? meta.method : '-'}</Typography>
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell width={160} sx={{ verticalAlign: 'top' }}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Rejection story"}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography fontSize={14} component='div' whiteSpace={'pre-line'} dangerouslySetInnerHTML={{__html: rejection.content.rendered ? rejection.content.rendered : '-'}}></Typography>
								</TableCell>
							</TableRow>

							{rejection.skills && (
								<TableRow>
									<TableCell width={160}>
										<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
											{"My skills"}
										</Typography>
									</TableCell>

									<TableCell>
										<Box 
											sx={{ 
												display: 'flex',
												flexWrap: 'wrap',
												listStyle: 'none',
												gap: 1
											}}
										>
											{rejection.mySkills.map((item: any, index: number) => {
												return (
													<Box key={index}>
														<Chip label={item} size="small" />
													</Box>
												)
											})}
										</Box>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</Box>

				<Grid container marginTop={3} gap={2}>
					<Grid item>
						<Button 
							size="small" 
							variant="text" 
							sx={{ 
								paddingLeft: 1.5, 
								paddingRight: 1.5,
								borderRadius: 10
							}}
							startIcon={
								props.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
							}
							onClick={() => onFavorited(props.id)}
						>
							{`${props.favorite_count} support ${props.favorited ? '' : '| Give one'}`}
						</Button>
					</Grid>
					
					{ // @ts-ignore
					data?.user?.id !== author.id && (
						<Grid item>
							<Button 
								size="small" 
								variant="text" 
								sx={{ 
									paddingLeft: 1.5, 
									paddingRight: 1.5,
									borderRadius: 10
								}}
							>
								{"Inform a job"}
							</Button>
						</Grid>
					)}
				</Grid>
			</CardContent>
		</Card>
	)
}

export default RejectionItem