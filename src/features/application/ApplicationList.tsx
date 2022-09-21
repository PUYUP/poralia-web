import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ApplicationItem from './ApplicationItem'
import { useListApplicationQuery } from './Api'
import RejectionForm from '../rejection/RejectionForm'


const ApplicationList = (props: any, ref: any) => {
	const { data: data, isLoading } = useListApplicationQuery({ type: 'new_application' })
	const [openRejected, setOpenRejected] = React.useState(false);
	const [application, setApplication] = React.useState<any>({})

	const handleRejectedOpen = (data: any) => {
		setOpenRejected(true);
		setApplication(data)
	};
	
	const handleRejectedClose = () => {
		setOpenRejected(false);
		setApplication({})
	};


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
						<ApplicationItem onRejected={handleRejectedOpen} key={index} {...item} />
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
		</>
		
	)
}

export default React.forwardRef(ApplicationList)