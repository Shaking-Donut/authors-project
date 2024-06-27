import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

interface EditToolbarProps {
	createAuthor: () => void;
	refetchAuthors: () => void;
	deleteSelectedAuthors: () => void;
	isAnyRowSelected: boolean;
}

export function EditToolbar({
	createAuthor,
	refetchAuthors,
	deleteSelectedAuthors,
	isAnyRowSelected
}: EditToolbarProps) {
	return (
		<GridToolbarContainer sx={{ justifyContent: "space-between" }}>
			<Tooltip title="Add author">
				<Button color="primary" startIcon={<AddIcon />} onClick={createAuthor}>
					Add author
				</Button>
			</Tooltip>

			<Stack direction={"row"} spacing={0.5}>
				{isAnyRowSelected && (
					<Tooltip title="Delete selected authors">
						<Button
							color="error"
							startIcon={<DeleteIcon />}
							onClick={deleteSelectedAuthors}
						>
							Delete selected
						</Button>
					</Tooltip>
				)}
				<Tooltip title="Refresh authors">
					<IconButton color="primary" onClick={refetchAuthors}>
						<ReplayIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			</Stack>
		</GridToolbarContainer>
	);
}
