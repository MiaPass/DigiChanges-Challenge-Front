import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Home from "./components/Home";
import { themeOptions } from "./css/themeOptions";
import "./App.css";

const theme = createTheme(themeOptions);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<Home />
			</div>
		</ThemeProvider>
	);
}

export default App;
