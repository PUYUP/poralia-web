import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useListActivityQuery } from "../activity/Api"
import RejectionItem from '../rejection/RejectionItem'

const ActivityList = (props: {
	userId: string,
}) => {
	const { data: rejections, isSuccess, isLoading } = useListActivityQuery({ type: 'new_rejection', user_id: props.userId })

	return (
		<>
			<Box>
				{isLoading ? (
					<Box paddingTop={4} paddingBottom={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
						<CircularProgress sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
						<Typography textAlign={'center'} marginTop={2}>{"Please wait..."}</Typography>
					</Box>
				) : (
					<>
						{rejections?.length <= 0 &&
							<Typography>{"No data."}</Typography>
						}
					</>
				)}
			</Box>

			{!isLoading && (
				<Box marginTop={5}>
					{rejections?.map((item: any, index: number) => {
						return (
							<RejectionItem key={index} {...item} />
						)
					})}
				</Box>
			)}
		</>
	)
}

export default ActivityList