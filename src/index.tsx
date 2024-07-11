import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import App from "./App";

const container: HTMLElement | null = document.getElementById("root");

if (container) {
	const root = createRoot(container);

	root.render(
		<StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</StrictMode>
	);
} else {
	console.error("Root element not found");
}
