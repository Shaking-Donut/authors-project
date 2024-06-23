import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import ProviderWrapper from "./providers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ProviderWrapper>
			<App />
		</ProviderWrapper>
	</React.StrictMode>
);
