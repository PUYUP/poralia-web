import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import RejectionItem from './RejectionItem'
import { useListActivityQuery } from '../activity/Api'
import { useDispatch } from 'react-redux'

const RejectionList = React.forwardRef((props: any, ref) => {
	const [filter, setFilter] = React.useState<any>({ type: 'new_rejection' })
	const { data: data, isLoading, isSuccess, refetch, isFetching } = useListActivityQuery(filter)

	React.useImperativeHandle(ref, () => ({

		onPerformFilter(payload: any = {}) {
			const tagIds = payload?.tags?.map((d: any) => d.id)
			
			if (tagIds) {
				setFilter({
					...filter,
					tags: tagIds.join(','),
				})
			} else {
				setFilter({
					...filter,
					tags: '',
				})
			}

			refetch()
		}
	
	}));

	React.useEffect(() => {
		props.isFetching(isFetching)
	}, [isFetching])

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
})

export default RejectionList