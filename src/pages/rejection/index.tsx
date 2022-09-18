import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import { amber } from "@mui/material/colors"
import RateReviewIcon from '@mui/icons-material/RateReview';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import Head from "next/head"
import Link from "next/link"
import DashboardLayout from "../../components/DashboardLayout"
import RejectionList from "../../features/rejection/RejectionList"

const Rejection = (props: any) => {
	return (
		<>
			<Head>
				<title>{"Rejected Rejections | Poralia"}</title>
			</Head>
		
			<DashboardLayout>
				<Box marginBottom={5}>
					<Typography marginBottom={2}>{"Have job rejections experience? Feel free to share, let other recruiter got you!"}</Typography>
					
					<Link href="/share">
						<Button variant="contained" sx={{ borderRadius: 10 }} startIcon={<RateReviewOutlinedIcon />}>
							{"Share My Rejection"}
						</Button>
					</Link>
				</Box>

				<RejectionList />
			</DashboardLayout>
		</>
	)
}

export default Rejection