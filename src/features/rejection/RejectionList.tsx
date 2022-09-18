import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import RejectionItem from './RejectionItem'
import { useListActivityQuery } from '../activity/Api'

const RejectionList = (props: any) => {
	const { data: data, isLoading } = useListActivityQuery({ type: 'new_rejection' })

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
						<RejectionItem key={index} {...item} />
					)
				})}
			</Box>
		</>
		
	)
}

export default RejectionList