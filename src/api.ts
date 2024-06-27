import { GridRowId } from "@mui/x-data-grid";
import { Author, AuthorBase } from "./types";

export class API {
	private url: string;

	constructor(apiUrl: string) {
		this.url = apiUrl;
	}

	async getAuthors(): Promise<Author[]> {
		const response = await fetch(`${this.url}/authors`);
		if (!response.ok) throw new Error("Network response was not ok");
		const data: Promise<Author[]> = response.json();
		return data;
	}

	async deleteAuthor(id: GridRowId): Promise<void> {
		const response = await fetch(`${this.url}/authors/${id}`, {
			method: "DELETE"
		});
		if (!response.ok) throw new Error("Network response was not ok");
		const data = await response.json();
		return data;
	}

	async deleteAuthors(ids: GridRowId[]): Promise<void> {
		await Promise.all(
			ids.map((id) => {
				return fetch(`${this.url}/authors/${id}`, {
					method: "DELETE"
				});
			})
		);
	}

	async createAuthor(newAuthor: AuthorBase): Promise<Author> {
		const response = await fetch(`${this.url}/authors`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newAuthor)
		});
		if (!response.ok) throw new Error("Network response was not ok");
		const data: Author = await response.json();
		return data;
	}

	async updateAuthor(author: Author): Promise<Author> {
		const response = await fetch(`${this.url}/authors/${author.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(author)
		});
		if (!response.ok) throw new Error("Network response was not ok");
		const data: Author = await response.json();
		return data;
	}
}
