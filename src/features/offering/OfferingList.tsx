import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import OfferingItem from './OfferingItem'
import { useListActivityQuery } from '../activity/Api'
import { useAppDispatch } from '../../lib/hooks'
import { connect, useSelector } from 'react-redux'
import { setQueryFilter } from '../activity/Slice'


const OfferingList = (props: any, ref: any) => {
	const dispatch = useAppDispatch()
	const { user } = props
	const [filter, setFilter] = React.useState<any>({ 
		type: 'activity_comment', 
		secondary_type: 'job_offered',
		order: 'desc',
		display_comments: true,
	})
	const { data: applications, isLoading, isSuccess } = useListActivityQuery(filter)

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
						{applications?.length <= 0 &&
							<Typography textAlign={'center'}>{"No data."}</Typography>
						}
					</>
				)}

				{applications?.map((item: any, index: number) => {
					return (
						<OfferingItem key={index} {...item} />
					)
				})}
			</Box>
		</>
		
	)
}

export default OfferingList