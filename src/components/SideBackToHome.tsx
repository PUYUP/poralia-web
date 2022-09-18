import Link from 'next/link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'


export const SideBackToHome = () => {
	return (
		<Box sx={{
			position: 'absolute',
			left: 0,
			top: 0
		}}>
			<Link href="/">
				<Button 
					variant="text" 
					startIcon={<ArrowBackIosNewIcon />} 
					size="small" 
					color="primary"
					sx={{ textTransform: 'capitalize' }}
				>
					{"Back to Home"}
				</Button>
			</Link>
		</Box>
	)
}
