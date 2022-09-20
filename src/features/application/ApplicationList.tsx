import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import ApplicationItem from './ApplicationItem'
import { useListApplicationQuery } from './Api'


const ApplicationList = (props: any, ref: any) => {
	const { data: data, isLoading } = useListApplicationQuery({ type: 'new_application' })

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
						<ApplicationItem key={index} {...item} />
					)
				})}
			</Box>
		</>
		
	)
}

export default React.forwardRef(ApplicationList)