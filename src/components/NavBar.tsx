import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../types/interfaces/reduxItems.interface";
import { AppDispatch } from "../redux/store";
import { resetTheOne, resetFiltered } from "../redux/actions";

import Search from "./functions/search";

import { tabsInfo } from "./functions/RenderTabs";
import starwarsLogo from "../css/images/starwars-logo.png";
import "../css/nav.css";
import { useNavigate } from "react-router";

function NavBar({ value, handleChangeValue, categories, page }) {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const filtered = useSelector((state: RootState) => state.filtered);

	const handleState = (e) => {
		e.preventDefault();
		dispatch(resetTheOne([]));
		dispatch(resetFiltered([]));
		navigate("/");
	};

	return (
		<nav className="navbar">
			<Box
				className="box-logo"
				sx={{
					width: "100%",
				}}
			>
				<button className="logo-button" onClick={handleState}>
					<img src={starwarsLogo} alt="sw logo" />
				</button>

				<Search page={page} />
			</Box>

			{filtered instanceof Array && filtered.length !== 0 ? (
				<></>
			) : (
				<Box
					onClick={handleState}
					className="not-mobil-nav"
					sx={{
						width: "100%",
						height: 50,
					}}
				>
					{tabsInfo(value, handleChangeValue, categories)}
				</Box>
			)}
		</nav>
	);
}

export default NavBar;
