import {
	CssBaseline,
	ThemeProvider,
	createTheme,
	useMediaQuery
} from "@mui/material";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

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
					{children}
					{/*  */}
				</QueryClientProvider>
			</ThemeProvider>
			<ToastContainer
				position="bottom-right"
				theme={prefersDarkMode ? "light" : "dark"}
			/>
		</>
	);
}
