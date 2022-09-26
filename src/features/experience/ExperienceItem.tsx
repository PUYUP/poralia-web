import * as React from 'react';
import moment from "moment";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Chip from '@mui/material/Chip';
import { useSession } from "next-auth/react";
import { yellow } from '@mui/material/colors';
import Link from 'next/link';
import { useDeleteActivityMutation } from '../activity/Api';
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
	timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';
import { Divider } from '@mui/material';


const ExperienceItem = (props: any) => {
	const { data } = useSession()
	const { author, secondary_item } = props
	const meta = secondary_item.meta
	const [deleteExperience, deletedResult] = useDeleteActivityMutation()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
			  	await deleteExperience(id)
			}
		})
	}

	const onEditAchievement = (index: number, item: any) => {
		props.onUpdateAchievement({achievement_index: index, ...props})
	}

	return (
		<Card sx={{ 
			marginBottom: 3, 
			borderRadius: 4, 
			backgroundColor: () => {
				// @ts-ignore
				return data?.user?.id === author.id ? '#fff' : '#fff' 
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
											<Link href={`/editor/experience/?id=${props.id}&action=edit`}>
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
						<ListItemText 
							secondary={moment(secondary_item.date_gmt).format('lll')} 
							sx={{ cursor: 'pointer' }}
						>
							<Typography fontWeight={700}>{secondary_item.title.rendered}</Typography>
						</ListItemText>
					</ListItem>
				</Box>
				
				{meta.status == 'accepted' && (
					<Chip size="small" label={"Accepted"} variant="outlined" color={'primary'} icon={<WorkOffIcon />} />
				)}

				<Box>
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
								<TableCell width={140}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Applying in"}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography fontSize={14} color="primary" fontWeight={700}>{meta.applying_in ? meta.applying_in : '-'}</Typography>
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell width={140}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Started at"}
									</Typography>
								</TableCell>

								<TableCell>{meta.started_at ? moment(meta.started_at).format('LL') : '-'}</TableCell>
							</TableRow>

							<TableRow>
								<TableCell width={140}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Finished at"}
									</Typography>
								</TableCell>

								<TableCell>{meta.finished_at ? moment(meta.finished_at).format('LL') : 'Currently working here'}</TableCell>
							</TableRow>

							{meta?.achievements && meta?.achievements.length > 0 && (
								<TableRow>
									<TableCell colSpan={2}>
										<Divider sx={{ marginTop: 1, marginBottom: 1, borderStyle: 'dashed' }}></Divider>
									</TableCell>
								</TableRow>
							)}


							<TableRow sx={{ verticalAlign: 'top' }}>
								<TableCell width={140}>
									<Typography fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
										{"Achievements"}
									</Typography>
								</TableCell>

								<TableCell>
									{meta?.achievements && meta?.achievements.length > 0 ? (
										<Timeline 
											sx={{
												padding: 0,
												margin: 0,
												[`& .${timelineOppositeContentClasses.root}`]: {
													flex: 0.2,
												},
											}}
										>
											{meta.achievements?.map((item: any, index: number) => {
												return (
													<TimelineItem 
														key={index}
														sx={{ 
															minHeight: '35px'
														}}
													>
														<TimelineOppositeContent color="text.secondary" sx={{ fontSize: 13, paddingTop: '1px' }}>
															{moment(item.date).format('L')}
														</TimelineOppositeContent>
														<TimelineSeparator>
															<TimelineDot sx={{ margin: '6.5px 0', borderWidth: '1px', padding: '3px' }} />
															<TimelineConnector />
														</TimelineSeparator>
														<TimelineContent sx={{ fontSize: 13, paddingTop: '1px' }}>
															<Box display={'flex'}>
																<Box>{item.summary}</Box>
																<Box marginLeft={'auto'} width={20}>
																	<IconButton size='small' onClick={() => onEditAchievement(index, item)}>
																		<EditIcon sx={{ fontSize: 15 }} />
																	</IconButton>
																</Box>
															</Box>
														</TimelineContent>
													</TimelineItem>
												)
											})}
										</Timeline>
									) : (
										<>-</>
									)}
									
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					
					<Box marginTop={3}>
						<Grid container alignItems={'center'}>
							<Grid item xs={5}>
								<Button 
									startIcon={<EmojiEventsOutlinedIcon />} 
									size="small" 
									sx={{ borderRadius: 5 }}
									onClick={() => props.onUpdateAchievement(props)}
								>
									{"Update Achievement"}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</CardContent>
		</Card>
	)
}

export default ExperienceItem