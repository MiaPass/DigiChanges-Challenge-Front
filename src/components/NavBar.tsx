import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";

import "../css/nav.css";

function allyProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const Nav = ({ categories, value, handleChangeValue }) => {
	const tabsInfo = () => {
		return (
			<>
				<Tabs
					value={value}
					onChange={handleChangeValue}
					textColor="primary"
					indicatorColor="primary"
					sx={{ width: "100%" }}
				>
					{categories?.map((category, index) => {
						return (
							<Tab
								id={category}
								sx={{
									minHeight: 50,
									width: "20%",
								}}
								label={category}
								{...allyProps(index)}
							/>
						);
					})}
				</Tabs>
			</>
		);
	};

	return (
		<nav className="navbar">
			<Box
				sx={{
					// flexGrow: 1,
					bgcolor: "background.paper",
					display: "flex",
					height: "50%",
					width: "100%",
				}}
			>
				<Box
					sx={{
						// flexGrow: 1,
						bgcolor: "background.paper",
						display: "flex",
						height: "50%",
						width: "100%",
					}}
				>
					<input />
				</Box>

				{tabsInfo()}
			</Box>
		</nav>
	);
};

export default Nav;
