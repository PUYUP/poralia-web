import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import PersonIcon from '@mui/icons-material/Person'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Button from '@mui/material/Button'
import { grey } from '@mui/material/colors'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import * as React from 'react'
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AccountForm from './forms/AccountForm'
import { useUpdateUserMutation, useUploadAvatarMutation } from './Api'

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
	  duration: theme.transitions.duration.shortest,
	}),
}));


const AccountCard = (props: {
	user: any,
	isMe: boolean,
}) => {
	const avatar = props?.user?.simple_local_avatar ? props?.user?.simple_local_avatar?.[192] : props.user?.avatar_urls?.[96]
	const [open, setOpen] = React.useState<boolean>(false);
	const [expandedAbout, setExpandedAbout] = React.useState<boolean>(false)
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const [uploadAvatar, isSuccess] = useUploadAvatarMutation()
  
	const handleClickOpen = () => {
	  	setOpen(true);
	};
  
	const handleClose = () => {
	  	setOpen(false);
	};

	const handleExpandClick = () => {
		setExpandedAbout(!expandedAbout)
	}

	const onUpdateSubmited = () => {
		setExpandedAbout(true)
		setOpen(false);
	}

	const onAvatarChange = (event: any) => {
		const payload = new FormData();

		payload.append('is_avatar', '1');
		payload.append('file', event.target.files[0])

		uploadAvatar(payload)
	}

	return (
		<>
			<Grid container alignItems={'center'}>
				<Grid item xs={12} sm={3}>
					<Box marginRight={'auto'} position={'relative'}>
						<Avatar 
							variant="circular" 
							src={avatar}
							sx={{
								marginLeft: 'auto',
								marginRight: 'auto',
								marginBottom: {
									xs: 3,
									sm: 0
								},
								width: {
									xs: 200,
									sm: '100%'
								},
								height: {
									xs: 200,
									sm: 'auto'
								}
							}}
						>
							<PersonIcon />
						</Avatar>

						{props.isMe && (
							<Box
								sx={{
									position: 'absolute',
									top: 0,
									right: 0,
									bottom: 0,
									left: 0,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<IconButton color="primary" aria-label="upload picture" component="label">
									<input hidden accept="image/*" type="file" onChange={onAvatarChange} />
									<PhotoCamera />
								</IconButton>
							</Box>
						)}
					</Box>
				</Grid>

				<Grid item 
					xs={12} 
					sm={9} 
					paddingLeft={{
						xs: 0,
						sm: 3,
					}}
					textAlign={{
						xs: 'justify',
						sm: 'left',
					}}
				>
					<Box>
						<Typography fontWeight={700} fontSize={20}>{props.user.name}</Typography>
						<Typography color={grey[600]}>@{props.user.username}</Typography>
					</Box>

					{props.isMe &&
						<Box marginTop={2}>
							<Button
								startIcon={<BorderColorIcon />}
								onClick={handleClickOpen}
							>
								{"Edit account"}
							</Button>
						</Box>
					}
				</Grid>

				<Grid item xs={12}>
					{props.user.description && (
						<>
							<Card 
								sx={{ 
									borderRadius: 4, 
									marginTop: 3,
								}}
								onClick={handleExpandClick}
							>
								<CardContent sx={{ 
									padding: 1,
									[`&:last-child`]: {
										paddingBottom: 1,
									}
								}}>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography component="div" paddingLeft={2}>
											{"About me"}
										</Typography>

										<Box sx={{ marginLeft: 'auto' }}>
											<ExpandMore
												expand={expandedAbout}
												onClick={handleExpandClick}
												aria-expanded={expandedAbout}
												aria-label="show more"
											>
												<ExpandMoreIcon />
											</ExpandMore>
										</Box>
									</Box>

									<Collapse in={expandedAbout} timeout="auto" unmountOnExit>
										<Typography 
											padding={2} 
											component='div' 
											dangerouslySetInnerHTML={{__html: props.user.description}}
											whiteSpace={'pre-line'}
										></Typography>
        							</Collapse>
								</CardContent>
							</Card>
						</>
					)}
				</Grid>
			</Grid>

			<Dialog
				fullScreen={fullScreen}
				open={open}
				aria-labelledby="responsive-dialog-title"
				sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: '95%' } }}
			>
				<DialogContent sx={{ paddingTop: 5 }}>
					<AccountForm user={props.user} onSubmited={onUpdateSubmited} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						{"Cancel"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default AccountCard