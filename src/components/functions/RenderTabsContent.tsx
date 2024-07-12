import { Box } from "@mui/material";

import { CategoryData } from "../../types/interfaces/category.interface";
import CardCustom from "../Card";

const renderContent = (data: any, depth: number = 0): React.ReactNode => {
	const itemsWanted = [
		"name",
		"starship_model",
		"films",
		"planets",
		"planet",
		"characters",
		"starships",
	];

	const renderNestedContent = (value: any): React.ReactNode => {
		if (value instanceof Array) {
			return (
				<>
					{value.map((item, index) => (
						<p key={index}>{item.name || JSON.stringify(item)}</p>
					))}
				</>
			);
		} else if (typeof value === "object" && value !== null) {
			return value.name || JSON.stringify(value);
		} else {
			return String(value);
		}
	};

	if (data instanceof Array) {
		return (
			<>
				{data.map((item, index) => (
					<p key={item._id || index}>{renderContent(item, depth + 1)}</p>
				))}
			</>
		);
	} else if (typeof data === "object" && data !== null) {
		return (
			<CardCustom key={data._id}>
				{Object.entries(data).map(([key, value]) => {
					if (!itemsWanted.includes(key)) return null;
					return (
						<p key={key}>
							{key
								.split("_")
								.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
								.join(" ")}
							: {renderNestedContent(value)}
						</p>
					);
				})}
			</CardCustom>
		);
	} else {
		return String(data);
	}
};

const renderCategoryContent = (
	category: string,
	allInfo: CategoryData[],
	films: CategoryData[],
	people: CategoryData[],
	planets: CategoryData[],
	starships: CategoryData[]
): React.ReactNode => {
	let info;
	switch (category) {
		case "films":
			info = films;
			break;
		case "people":
			info = people;
			break;
		case "planets":
			info = planets;
			break;
		case "starships":
			info = starships;
			break;
		default:
			info = allInfo;
	}

	return renderContent(info);
};

export const tabPanelInfo = (
	categories: string[],
	value: number,
	allInfo: CategoryData[],
	films: CategoryData[],
	people: CategoryData[],
	planets: CategoryData[],
	starships: CategoryData[]
) => {
	return (
		<>
			{categories?.map((category, index) => {
				return (
					<div
						key={category}
						role="tabpanel"
						hidden={value !== index}
						id={`simple-tabpanel-${index}`}
						aria-labelledby={`simple-tab-${index}`}
					>
						{value === index && (
							<Box sx={{ p: 3 }}>
								{renderCategoryContent(
									category,
									allInfo,
									films,
									people,
									planets,
									starships
								)}
							</Box>
						)}
					</div>
				);
			})}
		</>
	);
};
