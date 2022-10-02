import * as React from 'react'
import moment from "moment";
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography'
import RejectionItem from './RejectionItem'
import { useListActivityQuery } from '../activity/Api'
import { useAppDispatch } from '../../lib/hooks'
import OfferJobForm from './OfferJobForm';

import { setQueryFilter } from '../activity/Slice';


const RejectionList = (props: any, ref: any) => {
	const dispatch = useAppDispatch()
	const [page, setPage] = React.useState<number>(1)
	const [filter, setFilter] = React.useState<any>({ type: 'new_rejection', page: page })
	const { data: data, isLoading, isSuccess, refetch, isFetching } = useListActivityQuery(filter)
	const [offeredJob, setOfferedJob] = React.useState<boolean>(false)
	const [showOfferedJob, setShowOfferedJob] = React.useState<boolean>(false)
	const [activityItem, setActivityItem] = React.useState<any>()

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

	const onOfferJob = (item: any) => {
		setActivityItem(item)
		setOfferedJob(true)
	}

	const handleClose = () => {
		setActivityItem({})
		setOfferedJob(false);
	}

	const onJobOfferingSubmitSuccess = () => {
		setOfferedJob(false);
	}

	const onShowOfferedJob = (item: any) => {
		setActivityItem(item)
		setShowOfferedJob(true)
	}

	const handleHideOfferedJob = () => {
		setActivityItem({})
		setShowOfferedJob(false)
	}

	const handleLoadMore = () => {
		setPage(page + 1)
	}

	React.useEffect(() => {
		props.isFetching(isFetching)

		// i don't know what i wrote about this
		dispatch(setQueryFilter(filter))
	}, [isSuccess, isFetching])

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
						<RejectionItem key={index} {...item} onOfferJob={onOfferJob} onShowOfferedJob={onShowOfferedJob} />
					)
				})}

				{(!isLoading && data) &&
					<Box textAlign={'center'}>
						<Button 
							type="button"
							variant="contained"
							onClick={handleLoadMore}
							sx={{
								borderRadius: 5
							}}
						>
							{"Load more"}
						</Button>
					</Box>
				}
			</Box>

			{activityItem?.id && (
				<>
					<Dialog open={offeredJob} onClose={handleClose} fullWidth maxWidth={'sm'}>
						<DialogTitle>
							<Box display={'flex'} alignItems={'center'}>
								<Box>{`Offer job to ${activityItem?.author.name}`}</Box>
								<Box marginLeft={'auto'}>
									<Button onClick={handleClose}>Cancel</Button>
								</Box>
							</Box>
						</DialogTitle>

						<DialogContent>
							<Box paddingTop={1}>
								<OfferJobForm activity={activityItem} onSubmitSuccess={onJobOfferingSubmitSuccess} />
							</Box>
						</DialogContent>
					</Dialog>

					<Dialog
						open={showOfferedJob}
						onClose={handleHideOfferedJob}
						fullWidth
						maxWidth={'sm'}
					>
						<DialogTitle id="alert-dialog-title">
							<Box display={'flex'} alignItems={'center'}>
								<Box>{"My offered job"}</Box>
								<Box marginLeft={'auto'}>
									<Button onClick={handleHideOfferedJob}>{"Hide"}</Button>
								</Box>
							</Box>
						</DialogTitle>

						<DialogContent>
							<List>
								{activityItem.offering.activities.map((item: any, index: number) => {
									return (
										<>
											<ListItem key={index}>
												<Box>
													<Typography fontSize={14} fontWeight={700} marginBottom={0}>
														{`${moment(item.date_gmt).format('LL')}`}
													</Typography>
													<Typography 
														fontSize={14} 
														component='div' 
														dangerouslySetInnerHTML={{__html: item.content ? item.content.rendered : '-'}}
														sx={{
															[`& p:first-child`]: {
																marginTop: '5px'
															}
														}}
													></Typography>
												</Box>
											</ListItem>
										</>
									)
								})}
							</List>
						</DialogContent>
					</Dialog>
				</>
			)}
		</>
		
	)
}

export default React.forwardRef(RejectionList)