import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CurrentJobItem from './CurrentJobItem'
import { useListActivityQuery } from '../activity/Api'
import RejectionForm from '../rejection/RejectionForm'
import { useAppDispatch } from '../../lib/hooks'
import AchievementForm from './AchievementForm'
import { connect, useSelector } from 'react-redux'
import { setQueryFilter } from '../activity/Slice'


const CurrentJobList = (props: any, ref: any) => {
	const dispatch = useAppDispatch()
	const { user } = props
	const [filter, setFilter] = React.useState<any>({ 
		type: 'new_current_job', 
		username: user.username 
	})
	const { data: currentJobs, isLoading, isSuccess } = useListActivityQuery(filter)

	const [openRejected, setOpenRejected] = React.useState(false)
	const [openUpdateAchievement, setOpenUpdateAchievement] = React.useState(false)
	const [currentJob, setCurrentJob] = React.useState<any>({})

	const handleRejectedOpen = (data: any) => {
		setOpenRejected(true)
		setCurrentJob(data)
	}
	
	const handleRejectedClose = () => {
		setOpenRejected(false)
		setCurrentJob({})
	}

	const handleUpdateAchievementOpen = (data: any) => {
		setOpenUpdateAchievement(true)
		setCurrentJob(data)
	}
	
	const handleUpdateAchievementClose = () => {
		setOpenUpdateAchievement(false)
		setCurrentJob({})
	}

	const onUpdateAchievementSuccess = () => {
		setOpenUpdateAchievement(false)
		setCurrentJob({})
	}

	React.useEffect(() => {
		// i don't know what i wrote about this
		dispatch(setQueryFilter(filter))
	}, [isSuccess])

	return (
		<>
			<Box>
				{isLoading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</Box>
				) : (
					<>
						{currentJobs?.length <= 0 &&
							<Typography textAlign={'center'}>{"No data."}</Typography>
						}
					</>
				)}

				{currentJobs?.map((item: any, index: number) => {
					return (
						<CurrentJobItem onRejected={handleRejectedOpen} onUpdateAchievement={handleUpdateAchievementOpen} key={index} {...item} />
					)
				})}
			</Box>

			<Dialog open={openRejected} onClose={handleRejectedClose}>
				<DialogTitle>
					<Grid container>
						<Grid item xs={6}>{"Rejected"}</Grid>
						<Grid item xs={6} textAlign={'right'}><Button onClick={handleRejectedClose}>Cancel</Button></Grid>
					</Grid>
				</DialogTitle>

				<DialogContent>
					<Box sx={{ paddingTop: 1 }}>
						<RejectionForm id={0} isLoading={false} activity={currentJob} action={'create'} />
					</Box>
				</DialogContent>
			</Dialog>

			<Dialog open={openUpdateAchievement} onClose={handleUpdateAchievementClose} fullWidth maxWidth="xs">
				<DialogTitle>
					<Grid container>
						<Grid item xs={7}>{"Update achievement"}</Grid>
						<Grid item xs={5} textAlign={'right'}><Button onClick={handleUpdateAchievementClose}>Cancel</Button></Grid>
					</Grid>
				</DialogTitle>

				<DialogContent>
					<Box sx={{ paddingTop: 1 }}>
						<AchievementForm onSuccess={onUpdateAchievementSuccess} {...currentJob} />
					</Box>
				</DialogContent>
			</Dialog>
		</>
		
	)
}

const currentJobStateToProps = (state: any) => {
	return {
		currentJob: state.currentJob
	}
}

export default connect(currentJobStateToProps)(React.forwardRef(CurrentJobList))