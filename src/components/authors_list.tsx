import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { Author } from "../types";

const columns: GridColDef<Author[][number]>[] = [
	{ field: "id", headerName: "ID", width: 90 },
	{ field: "name", headerName: "Name", width: 150 },
	{ field: "surname", headerName: "Surname", width: 150 },
	{
		field: "action",
		headerName: "Action",
		sortable: false,
		filterable: false,
		width: 200,
		renderCell: (params) => {
			const onClick = () => {
				alert(`Edit ${params.row.id}`);
			};

			return (
				<Stack
					spacing={1}
					direction={"row"}
					alignSelf={"center"}
					justifySelf={"center"}
					justifyContent={"center"}
				>
					<Button variant="contained" color="primary" onClick={onClick}>
						Edit
					</Button>
					<Button variant="contained" color="primary" onClick={onClick}>
						Delete
					</Button>
				</Stack>
			);
		}
	}
];

export default function AuthorsList() {
	const { data: authors, isLoading } = useQuery("authors", async () => {
		const response = await fetch("http://localhost:8000/authors");
		const data: Author[] = await response.json();
		return data;
	});

	return (
		<DataGrid
			columns={columns}
			rows={isLoading ? [] : authors}
			checkboxSelection={false}
			autoHeight={true}
			disableRowSelectionOnClick
			loading={isLoading}
			sx={{
				"& .MuiDataGrid-cell": {
					display: "flex"
				}
			}}
		/>
	);
}
