import { Stack, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ListActionsProps {
	onClick: () => void;
}

export function ListActions({ onClick }: ListActionsProps) {
	return (
		<Stack
			spacing={1}
			direction={"row"}
			alignSelf={"center"}
			justifySelf={"center"}
			justifyContent={"center"}
		>
			<Button variant="text" color="primary" onClick={onClick}>
				Edit
			</Button>
			<IconButton color="error" onClick={onClick}>
				<DeleteIcon />
			</IconButton>
		</Stack>
	);
}
