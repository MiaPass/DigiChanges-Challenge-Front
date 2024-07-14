import { Tabs, Tab } from "@mui/material";

function allyProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export const tabsInfo = (value, handleChangeValue, categories) => {
	return (
		<Tabs
			value={value}
			onChange={handleChangeValue}
			textColor="primary"
			indicatorColor="primary"
			sx={{ width: "60%" }}
			className="nav-bottom"
		>
			{categories?.map((category, index) => {
				return (
					<Tab
						key={category}
						id={category}
						sx={{
							width: "20%",
						}}
						label={category}
						{...allyProps(index)}
					/>
				);
			})}
		</Tabs>
	);
};
