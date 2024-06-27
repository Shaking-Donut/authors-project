import {
	CssBaseline,
	ThemeProvider,
	createTheme,
	useMediaQuery
} from "@mui/material";
import { createContext, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { API } from "./api";

const queryClient = new QueryClient();

const api = new API("http://localhost:8000");

export const apiContext = createContext(api);

export default function ProviderWrapper({
	children
}: {
	children: React.ReactNode;
}) {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light"
				}
			}),
		[prefersDarkMode]
	);
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<QueryClientProvider client={queryClient}>
					<apiContext.Provider value={api}>
						{children}
						{/*  */}
					</apiContext.Provider>
				</QueryClientProvider>
			</ThemeProvider>
			<ToastContainer
				position="bottom-right"
				limit={5}
				closeOnClick
				theme={prefersDarkMode ? "light" : "dark"}
			/>
		</>
	);
}
