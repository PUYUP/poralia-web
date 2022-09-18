import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { orange } from '@mui/material/colors';

export const SideInfo = () => {
	return (
		<Box>
			<Typography 
				color={'white'}
				fontFamily={'Old Standard TT'}
				fontWeight={'700'}
				component="h1"
				sx={{
					fontFamily: 'Old Standard TT',
					fontSize: {
						xs: 40,
						sm: 50,
						md: 70,
					}
				}}
			>
				{"Poralia"}
			</Typography>

			<Box>
				<Typography 
					color={orange[50]}
					fontFamily={'Old Standard TT'}
					fontWeight={'400'}
					fontStyle="italic"
					sx={{
						fontFamily: 'Old Standard TT',
						fontSize: {
							sm: 17,
							md: 22,
						}
					}}
				>
					{'You can dream, create, design and build the most wonderful place in the world…but it requires people to make the dream a reality. (Walt Disney)'}
				</Typography>
			</Box>
		</Box>
	)
}