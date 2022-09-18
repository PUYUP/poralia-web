import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const FooterMenu = () => {
	return (
		<>
			<Container 
				maxWidth="md" 
				sx={{ margin: 'auto' }}
			>
				<Grid container gap={4} justifyContent="center">
					<Grid>
						<Link href="/about">
							<a>
								<Typography fontFamily={'Old Standard TT'}>
									{"About"}
								</Typography>
							</a>
						</Link>
					</Grid>
					
					<Grid>
						<Link href="/contact">
							<a>
								<Typography fontFamily={'Old Standard TT'}>
									{"Contact"}
								</Typography>
							</a>
						</Link>
					</Grid>
				</Grid>
          	</Container>
		</>
	)
}

export default FooterMenu