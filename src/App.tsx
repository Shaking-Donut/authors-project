import { Container, Paper, Typography } from "@mui/material";
import AuthorsList from "./components/authors_list";

function App() {
	return (
		<Container maxWidth={"md"} sx={{ m: 2, marginInline: "auto" }}>
			<Paper elevation={1} sx={{ p: 2 }}>
				<Typography variant="h4" component="h1" mb={1}>
					Authors
				</Typography>
				<AuthorsList />
			</Paper>
		</Container>
	);
}

export default App;
