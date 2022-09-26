import * as React from "react"
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useListActivityQuery } from "./Api"
import RejectionItem from "../rejection/RejectionItem"
import ApplicationItem from "../application/ApplicationItem"
import { useAppDispatch } from "../../lib/hooks"
import { setQueryFilter } from "./Slice"
import RejectionForm from "../rejection/RejectionForm"
import StageForm from "../application/StageForm"

const ActivityList = (
	props: { query: any }, 
	ref: any,
) => {
	const dispatch = useAppDispatch()
	const { data: activities, isLoading, isSuccess } = useListActivityQuery(props.query)

	// Application tools
	const [rejectedApplication, setRejectedApplication] = React.useState(false)
	const [updateApplicationStage, setUpdateApplicationStage] = React.useState(false)
	const [application, setApplication] = React.useState<any>({})

	const handleApplicationRejected = (item: any) => {
		setRejectedApplication(true)
		setApplication(item)
	}
	
	const handleApplicationRejectedClose = () => {
		setRejectedApplication(false)
		setApplication({})
	}

	const handleApplicationUpdateStage = (item: any) => {
		setUpdateApplicationStage(true)
		setApplication(item)
	}
	
	const handleApplicationUpdateStageClose = () => {
		setUpdateApplicationStage(false)
		setApplication({})
	}

	const onUpdateApplicationStageSuccess = () => {
		setUpdateApplicationStage(false)
		setApplication({})
	}
	// .end of application tools

	React.useEffect(() => {
		// save current query filter
		if (isSuccess) {
			dispatch(setQueryFilter(props.query))
		}
	}, [isSuccess])

	React.useImperativeHandle(ref, () => ({
		// execution method from outside component will be here
	}))

	return (
		<>
			{isLoading ? (
				<Box paddingTop={4} paddingBottom={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
					<CircularProgress sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
					<Typography textAlign={'center'} marginTop={2}>{"Please wait..."}</Typography>
				</Box>
			) : (
				<>
					{activities?.length <= 0 &&
						<Typography textAlign={'center'}>{"No data."}</Typography>
					}
				</>
			)}

			{activities?.map((item: any, index: number) => {
				return (
					<Box key={index}>
						{props.query.type === 'new_rejection' &&
							<RejectionItem {...item} />
						}

						{props.query.type === 'new_application' &&
							<ApplicationItem onRejected={handleApplicationRejected} onUpdateStage={handleApplicationUpdateStage} {...item} />
						}
					</Box>
				)
			})}

			{props.query.type === 'new_application' && (
				<>
					<Dialog open={rejectedApplication} onClose={handleApplicationRejectedClose}>
						<DialogTitle>
							<Grid container>
								<Grid item xs={6}>{"Rejected"}</Grid>
								<Grid item xs={6} textAlign={'right'}><Button onClick={handleApplicationRejectedClose}>Cancel</Button></Grid>
							</Grid>
						</DialogTitle>

						<DialogContent>
							<Box sx={{ paddingTop: 1 }}>
								<RejectionForm id={0} isLoading={false} activity={application} action={'create'} />
							</Box>
						</DialogContent>
					</Dialog>

					<Dialog open={updateApplicationStage} onClose={handleApplicationUpdateStageClose}>
						<DialogTitle>
							<Grid container>
								<Grid item xs={7}>{"Update current stage"}</Grid>
								<Grid item xs={5} textAlign={'right'}><Button onClick={handleApplicationUpdateStageClose}>Cancel</Button></Grid>
							</Grid>
						</DialogTitle>

						<DialogContent>
							<Box sx={{ paddingTop: 1 }}>
								<StageForm onSuccess={onUpdateApplicationStageSuccess} {...application} />
							</Box>
						</DialogContent>
					</Dialog>
				</>
			)}
		</>
	)
}

export default React.forwardRef(ActivityList)