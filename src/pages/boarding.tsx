import Head from "next/head"
import Container from "@mui/material/Container"
import GeneralLayout from "../components/GeneralLayout"

const Boarding = (props: {
	query: any
}) => {
	return (
		<>
			<Head>
				<title>Boarding | Poralia</title>
			</Head>

			<GeneralLayout>
				<Container maxWidth="md">
					{props.query.email}
				</Container>
			</GeneralLayout>
		</>
	)
}

Boarding.getInitialProps = ({ query }: any) => {
	return { query }
}

export default Boarding