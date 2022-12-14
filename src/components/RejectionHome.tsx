import * as React from 'react'
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { amber, grey } from "@mui/material/colors"
import TuneIcon from '@mui/icons-material/Tune';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Head from "next/head"
import DashboardLayout from './DashboardLayout'
import RejectionList from "../features/rejection/RejectionList"
import { useListTagsQuery } from '../features/activity/Api'
import TagItem from "../features/rejection/Tagitem"
import { useSelector } from 'react-redux'

const RejectionHome = (props: any) => {
	const rejectionListRef = React.useRef<any>()
	const [fetching, setFetching] = React.useState<boolean>(false)
	const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
	const toggleDrawer =
		(open: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setDrawerOpen(open);
		};
	const { data: tags, isLoading, isSuccess } = useListTagsQuery({}, {skip: !drawerOpen})
	const tagsFiltered = useSelector((state: any) => state.rejection.tagsFiltered)

	const performFilter = () => {
		if (rejectionListRef) {
			rejectionListRef.current.onPerformFilter({tags: tagsFiltered})
		}
	}

	const isFetching = (value: boolean) => {
		if (!value) {
			setDrawerOpen(false)
		}

		setFetching(value)
	}

	React.useEffect(() => {
		if (tagsFiltered <= 0 && rejectionListRef.current) {
			rejectionListRef.current.onPerformFilter({tags: null});
		}
	}, [tagsFiltered])

	return (
		<>
			<Head>
				<title>Poralia</title>
        		<meta name="description" content="Save job rejections then get new opportunity" />
			</Head>
		
			<DashboardLayout>
				<Box marginBottom={5}>	
					<Grid container alignItems={'center'}>
						<Grid item xs={7}>
							<Typography>{"Rejections across our network."}</Typography>
						</Grid>

						<Grid item xs={5} marginLeft={'auto'} textAlign={'right'}>
							<Button onClick={toggleDrawer(true)} startIcon={<TuneIcon />}>{"Filter result"}</Button>
						</Grid>
					</Grid>
				</Box>
					
				<RejectionList ref={rejectionListRef} isFetching={isFetching} />
			</DashboardLayout>

			<Drawer
				anchor={'left'}
				open={drawerOpen}
				onClose={toggleDrawer(false)}
			>
				<Box width={350}>
					<Box 
						padding={3}
						paddingTop={2}
						paddingBottom={2}
						sx={{
							backgroundColor: amber[100]
						}}
					>
						<Grid container alignItems={'center'}>
							<Grid item xs={8}><Typography>{"Filter by specifics job title"}</Typography></Grid>
							<Grid item xs={4} textAlign={'right'}>
								<IconButton onClick={toggleDrawer(false)} aria-label="close">
  									<CloseIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Box>
					
					{isLoading &&
						<Box sx={{ display: 'flex', flexDirection: 'column', padding: 3, alignItems: 'center', justifyContent: 'center' }}>
							<CircularProgress />
							<Typography marginTop={1}>{"Loading title collections..."}</Typography>
						</Box>
					}

					{tagsFiltered.length > 0 &&
						<Box 
							padding={3}
							paddingBottom={2}
							sx={{
								backgroundColor: grey[50]
							}}
						>
							<Box 
								sx={{
									[`& > div`]: {
										marginBottom: 1,
										marginRight: 1,
									},
									marginBottom: 1,
								}}
							>
								{tagsFiltered?.map((tag: any, index: number) => {
									return (
										<TagItem key={index} {...tag} />
									)
								})}
							</Box>

							<Button 
								size="small" 
								variant='contained'
								startIcon={<CheckIcon />}
								onClick={performFilter}
								disabled={fetching}
								sx={{
									borderRadius: 5,
								}}
							>
								{"Perform filter"}
							</Button>
						</Box>
					}

					<Box padding={3}>
						<Box 
							sx={{
								[`& > div`]: {
									marginBottom: 1,
									marginRight: 1,
								}
							}}
						>
							{tags?.map((tag: any, index: number) => {
								return (
									<TagItem key={index} {...tag} />
								)
							})}
						</Box>
					</Box>
				</Box>
			</Drawer>
		</>
	)
}

export default RejectionHome