import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Home from "./components/Home";
import { themeOptions } from "./css/themeOptions";
import "./css/App.css";

const theme = createTheme(themeOptions);

function App() {
	return (
		<ThemeProvider theme={theme}>
			{/* <BrowserRouter> */}
			<CssBaseline />
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route path="/:category/:name" element={<Details />} /> */}
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
