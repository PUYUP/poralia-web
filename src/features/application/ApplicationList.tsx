import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ApplicationItem from './ApplicationItem'
import { useListActivityQuery } from '../activity/Api'
import RejectionForm from '../rejection/RejectionForm'
import { useAppDispatch } from '../../lib/hooks'
import { setQueryFilter } from './Slice'
import StageForm from './StageForm'
import { connect } from 'react-redux'


const ApplicationList = (props: any, ref: any) => {
	const dispatch = useAppDispatch()
	const [filter, setFilter] = React.useState<any>({ type: 'new_application' })
	const { data: data, isLoading, isSuccess } = useListActivityQuery(filter)
	const [openRejected, setOpenRejected] = React.useState(false)
	const [openUpdateStage, setOpenUpdateStage] = React.useState(false)
	const [application, setApplication] = React.useState<any>({})

	const handleRejectedOpen = (data: any) => {
		setOpenRejected(true)
		setApplication(data)
	}
	
	const handleRejectedClose = () => {
		setOpenRejected(false)
		setApplication({})
	}

	const handleUpdateStageOpen = (data: any) => {
		setOpenUpdateStage(true)
		setApplication(data)
	}
	
	const handleUpdateStageClose = () => {
		setOpenUpdateStage(false)
		setApplication({})
	}

	const onUpdateStageSuccess = () => {
		setOpenUpdateStage(false)
		setApplication({})
	}

	React.useEffect(() => {
		// i don't know what i wrote about this
		dispatch(setQueryFilter(filter))
	}, [isSuccess])

	return (
		<>
			<Box>
				{isLoading && (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</Box>
				)}

				{data?.map((item: any, index: number) => {
					return (
						<ApplicationItem onRejected={handleRejectedOpen} onUpdateStage={handleUpdateStageOpen} key={index} {...item} />
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
						<RejectionForm id={0} isLoading={false} activity={application} action={'create'} />
					</Box>
				</DialogContent>
			</Dialog>

			<Dialog open={openUpdateStage} onClose={handleUpdateStageClose}>
				<DialogTitle>
					<Grid container>
						<Grid item xs={7}>{"Update current stage"}</Grid>
						<Grid item xs={5} textAlign={'right'}><Button onClick={handleUpdateStageClose}>Cancel</Button></Grid>
					</Grid>
				</DialogTitle>

				<DialogContent>
					<Box sx={{ paddingTop: 1 }}>
						<StageForm onSuccess={onUpdateStageSuccess} {...application} />
					</Box>
				</DialogContent>
			</Dialog>
		</>
		
	)
}

const applicationStateToProps = (state: any) => {
	return {
		application: state.application
	}
}

export default connect(applicationStateToProps)(React.forwardRef(ApplicationList))