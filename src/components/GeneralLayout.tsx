import React from "react";
import Box from '@mui/material/Box';
import FooterMenu from "./FooterMenu";

interface Props {
	children: React.ReactNode
}

const GeneralLayout = ({ children }: Props) => {
	return (
		<>
			<main>{children}</main>
			<footer>
				<Box sx={{ paddingBottom: 5 }}>
					<FooterMenu />
				</Box>
			</footer>
		</>
	)
}

export default GeneralLayout