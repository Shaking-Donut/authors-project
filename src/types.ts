import { GridRowId } from "@mui/x-data-grid";

export type AuthorBase = {
	name: string;
	surname: string;
};

export type Author = AuthorBase & { id: GridRowId };

export type AuthorExtended = Author & { isNew: boolean };
