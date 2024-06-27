import { useMutation, useQuery } from "react-query";
import {
	DataGrid,
	GridColDef,
	GridEventListener,
	GridRowEditStopReasons,
	GridRowId,
	GridRowModel,
	GridRowModes,
	GridRowModesModel,
	GridSlots
} from "@mui/x-data-grid";
import { Author, AuthorBase, AuthorExtended } from "../types";
import { useContext, useEffect, useState } from "react";
import { EditToolbar } from "./grid_toolbar";
import { toast } from "react-toastify";
import { getActionItems } from "./action_items";
import { apiContext } from "../providers";

export default function AuthorsList() {
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [rowSelectionModel, setRowSelectionModel] = useState<GridRowId[]>([]);
	const [rows, setRows] = useState<AuthorExtended[]>([]);
	const api = useContext(apiContext);

	const {
		data: authors,
		isLoading,
		refetch: refetchAuthors,
		isFetching
	} = useQuery({
		queryKey: ["getAuthors"],
		queryFn: async () => await api.getAuthors()
	});

	useEffect(() => {
		const rows = authors?.map((author) => ({ ...author, isNew: false })) || [];
		setRows(rows);
	}, [authors]);

	const { mutate: updateAuthor } = useMutation(
		async (author: Author) => await api.updateAuthor(author),
		{
			mutationKey: ["apdateAuthor"],
			onSuccess: (_, author) => {
				refetchAuthors({ cancelRefetch: true });
				toast.success(`Author #${author.id} updated successfully`);
			},
			onError: console.error
		}
	);

	const { mutateAsync: deleteAuthor } = useMutation(
		async (id: GridRowId | GridRowId[]) => {
			if (Array.isArray(id)) {
				await api.deleteAuthors(id);
			} else {
				await api.deleteAuthor(id);
			}
		},
		{
			mutationKey: ["deleteAuthor"],
			onSuccess: (_, authorId) => {
				refetchAuthors({ cancelRefetch: true });
				toast.success(
					`Author${
						Array.isArray(authorId) ? "s" : ""
					} #${authorId} deleted successfully`
				);
			},
			onError: console.error
		}
	);

	const deleteSelectedAuthors = async () => {
		await deleteAuthor(rowSelectionModel);
		setRowSelectionModel([]);
	};

	const { mutateAsync: createAuthor } = useMutation(
		async (newAuthor: AuthorBase) => await api.createAuthor(newAuthor),
		{
			mutationKey: ["createAuthor"],
			onSuccess: (data) => {
				toast.success(`Author #${data.id} created successfully`);
			},
			onError: console.error
		}
	);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (
		params,
		event
	) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View }
		});
	};

	const handleDeleteClick = async (id: GridRowId) => {
		await deleteAuthor(id);
	};

	const handleCancelClick = (id: GridRowId) => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true }
		});
	};

	const processRowUpdate = (newRow: GridRowModel<Author>) => {
		const updatedRow: AuthorExtended = { ...newRow, isNew: false };
		updateAuthor(updatedRow);
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const handleRowSelectionModelChange = (newSelectionModel: GridRowId[]) => {
		setRowSelectionModel(newSelectionModel);
	};

	const createAuthorAndEdit = async () => {
		const { id } = await createAuthor({ name: "", surname: "" });
		setRows((prev) => [...prev, { id, name: "", surname: "", isNew: true }]);
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" }
		});
	};

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90, editable: false },
		{
			field: "name",
			headerName: "Name",
			minWidth: 150,
			flex: 1,
			editable: true
		},
		{
			field: "surname",
			headerName: "Surname",
			minWidth: 150,
			flex: 1,
			editable: true
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
			cellClassName: "actions",
			getActions: getActionItems({
				rowModesModel,
				handleEditClick,
				handleDeleteClick,
				handleSaveClick,
				handleCancelClick
			})
		}
	];

	return (
		<DataGrid
			columns={columns}
			rows={rows}
			editMode="row"
			autoHeight
			rowModesModel={rowModesModel}
			onRowModesModelChange={handleRowModesModelChange}
			onRowEditStop={handleRowEditStop}
			processRowUpdate={processRowUpdate}
			slots={{
				toolbar: EditToolbar as GridSlots["toolbar"]
			}}
			slotProps={{
				toolbar: {
					createAuthor: createAuthorAndEdit,
					refetchAuthors,
					deleteSelectedAuthors,
					isAnyRowSelected: rowSelectionModel.length > 0
				}
			}}
			disableRowSelectionOnClick
			checkboxSelection
			rowSelectionModel={rowSelectionModel}
			onRowSelectionModelChange={handleRowSelectionModelChange}
			loading={isLoading || isFetching}
			initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
			pageSizeOptions={[5, 10, 20]}
			sx={{
				"& .MuiDataGrid-cell": {
					display: "flex"
				},
				"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
					outline: "none !important"
				}
			}}
		/>
	);
}
