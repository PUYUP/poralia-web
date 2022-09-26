import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import RejectionItem from './RejectionItem'
import { useListActivityQuery } from '../activity/Api'
import { setQueryFilter } from './Slice'
import { useAppDispatch } from '../../lib/hooks'


const RejectionList = (props: any, ref: any) => {
	const dispatch = useAppDispatch()
	const [filter, setFilter] = React.useState<any>({ type: 'new_rejection' })
	const { data: data, isLoading, refetch, isFetching } = useListActivityQuery(filter)

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

		// i don't know what i wrote about this
		dispatch(setQueryFilter(filter))
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
}

export default React.forwardRef(RejectionList)