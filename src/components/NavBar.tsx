import { Box } from "@mui/material";

import { tabsInfo } from "./functions/RenderTabs";

function NavBar({ value, handleChangeValue, categories }) {
	return (
		<nav className="navbar">
			<Box
				sx={{
					flexGrow: 1,
					bgcolor: "background.paper",
					display: "flex",
					height: "50%",
					width: "100%",
				}}
			>
				<input />
				<br />

				{tabsInfo(value, handleChangeValue, categories)}
			</Box>
		</nav>
	);
}

export default NavBar;
