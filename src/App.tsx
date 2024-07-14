import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import backgroundImageChosen from "./css/images/background-stars-desktop_v2_96b6d74a.png";
import { themeOptions } from "./css/themeOptions";
import "./css/App.css";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Details from "./components/Details";
import { RootState } from "./types/interfaces/reduxItems.interface";
const theme = createTheme(themeOptions);

function App() {
	const page = useSelector((state: RootState) => state.page);
	const [value, setValue] = React.useState<number>(0);
	const handleChangeValue = (e, newValue) => {
		e.preventDefault();
		setValue(newValue);
	};
	const categories = ["films", "people", "planets", "starships"];
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App" style={{ backgroundImage: backgroundImageChosen }}>
				<NavBar
					page={page}
					value={value}
					handleChangeValue={handleChangeValue}
					categories={categories}
				/>
				<Routes>
					<Route
						path="/"
						element={<Home categories={categories} value={value} />}
					/>
					<Route path="/:category/:name" element={<Details />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
