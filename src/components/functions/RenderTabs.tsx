import { Tabs, Tab } from "@mui/material";

function allyProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export const tabsInfo = (value, handleChangeValue, categories) => {
	return (
		<>
			<Tabs
				value={value}
				onChange={handleChangeValue}
				textColor="primary"
				indicatorColor="primary"
				sx={{ width: "100%", height: "40%" }}
			>
				{categories?.map((category, index) => {
					return (
						<Tab
							key={category}
							id={category}
							sx={{
								// minHeight: 50,
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
