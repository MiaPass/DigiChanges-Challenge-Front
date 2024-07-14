import { Box } from "@mui/material";
import { renderContent } from "./RenderComplexItems";
import "../../css/home.css";

const renderCategoryContent = (category: string, state): React.ReactNode => {
	let info = [];
	switch (category) {
		case "films":
		case "people":
		case "planets":
		case "starships":
			info = state[category].items;
			break;
		default:
			if (state.filtered instanceof Array && state.filtered.length !== 0) {
				info = state.filtered;
			} else {
				info = state.allInfo.items;
			}
	}

	return renderContent(info, 0, []);
};

export const tabPanelInfo = (categories: string[], value: number, state) => {
	return (
		<div className="content-div">
			{categories?.map((category, index) => {
				return (
					<div
						style={{ width: "100%" }}
						className="box-div"
						key={category}
						role="tabpanel"
						hidden={value !== index}
						id={`simple-tabpanel-${index}`}
						aria-labelledby={`simple-tab-${index}`}
					>
						{value === index && (
							<Box className="cards-box">
								{renderCategoryContent(category, state)}
							</Box>
						)}
					</div>
				);
			})}
		</div>
	);
};
