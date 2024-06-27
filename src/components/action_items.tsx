import { Tooltip } from "@mui/material";
import {
	GridActionsCellItem,
	GridRowId,
	GridRowModes,
	GridRowModesModel,
	GridRowParams
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

interface ActionItemsProps {
	rowModesModel: GridRowModesModel;
	handleEditClick: (id: GridRowId) => void;
	handleDeleteClick: (id: GridRowId) => void;
	handleSaveClick: (id: GridRowId) => void;
	handleCancelClick: (id: GridRowId) => void;
}

export function getActionItems({
	rowModesModel,
	handleEditClick,
	handleDeleteClick,
	handleSaveClick,
	handleCancelClick
}: ActionItemsProps) {
	return ({ id }: GridRowParams) => {
		const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

		if (isInEditMode) {
			return [
				<Tooltip title="Save" key="save">
					<GridActionsCellItem
						icon={<SaveIcon />}
						label="Save"
						sx={{
							color: "primary.main"
						}}
						onClick={() => handleSaveClick(id)}
					/>
				</Tooltip>,
				<Tooltip title="Cancel" key="cancel">
					<GridActionsCellItem
						icon={<CancelIcon />}
						label="Cancel"
						className="textPrimary"
						onClick={() => handleCancelClick(id)}
						color="inherit"
					/>
				</Tooltip>
			];
		}

		return [
			<Tooltip title="Edit" key="edit">
				<GridActionsCellItem
					icon={<EditIcon />}
					label="Edit"
					className="textPrimary"
					onClick={() => handleEditClick(id)}
					color="inherit"
				/>
			</Tooltip>,
			<Tooltip title="Delete" key="delete">
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={() => handleDeleteClick(id)}
					color="inherit"
				/>
			</Tooltip>
		];
	};
}
