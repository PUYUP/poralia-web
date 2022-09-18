import Typography from "@mui/material/Typography";
import Link from "next/link";

const Copyright = (props: any) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
				{'Copyright © '}
				<Link color="inherit" href="https://poralia.com/">
					Poralia
				</Link>{' '}
				{new Date().getFullYear()}
				<br />
				{'All right reserved'}
		</Typography>
	);
}

export default Copyright