import React from "react";

import CardCustom from "../Card";

const ITEMS_WANTED = [
	"name",
	"starship_model",
	"films",
	"planets",
	"planet",
	"characters",
	"starships",
	"category",
];

const capitalizeFirstLetter = (str: string): string =>
	str.charAt(0).toUpperCase() + str.slice(1);

const formatKey = (key: string): string =>
	key.split("_").map(capitalizeFirstLetter).join(" ");

const renderArrayContent = (
	value: any[],
	unwantedInfo: string[]
): React.ReactNode => {
	if (value.length === 0) return null;
	const displayItems = value.slice(0, 3);
	const remainingCount = value.length - 3;
	const separator = unwantedInfo.includes("_id") ? ", " : "";

	return (
		<>
			{displayItems.map((item, index) => (
				<React.Fragment key={index}>
					{item.name || JSON.stringify(item)}
					{index < displayItems.length - 1 ? separator : ""}
				</React.Fragment>
			))}
			{!unwantedInfo.includes("_id") && remainingCount > 0 && ", ..."}
		</>
	);
};

const renderObjectContent = (value: any, key: string): React.ReactNode => {
	if (key === "features") {
		return Object.entries(value).map(
			([subKey, subValue]) =>
				subKey !== "_id" && (
					<div key={subKey}>
						{formatKey(subKey)}:{" "}
						{typeof subValue === "string" ? subValue : JSON.stringify(subValue)}
					</div>
				)
		);
	}
	return value.name || JSON.stringify(value);
};

const renderNestedContent = (
	value: any,
	key: string,
	unwantedInfo: string[]
): React.ReactNode => {
	if (Array.isArray(value)) {
		return renderArrayContent(value, unwantedInfo);
	} else if (typeof value === "object" && value !== null) {
		return renderObjectContent(value, key);
	} else if (value === "" || value === null || value === undefined) {
		return null;
	} else {
		return capitalizeFirstLetter(String(value));
	}
};

const renderArrayData = (
	data: any[],
	depth: number,
	unwantedInfo: string[]
): React.ReactNode => {
	const filteredItems = data.filter(Boolean);
	return (
		<>
			{filteredItems.map(
				(item, index) =>
					!item.hasOwnProperty("currentPage") && (
						<span className="outer-box" key={item._id || index}>
							{renderContent(item, depth + 1, unwantedInfo)}
						</span>
					)
			)}
		</>
	);
};

const renderObjectData = (
	data: any,
	unwantedInfo: string[]
): React.ReactNode => {
	if (data.currentPage) return null;

	const classNameDetails = !unwantedInfo.includes("_id")
		? ""
		: "details-content";

	return (
		<CardCustom nameClass={classNameDetails}>
			{Object.entries(data).map(([key, value]) => {
				if (
					(!unwantedInfo.includes("_id") && !ITEMS_WANTED.includes(key)) ||
					unwantedInfo.includes(key) ||
					(key === "category" && value === "films") ||
					value === "" ||
					value === null ||
					value === undefined
				)
					return null;

				const displayKey =
					data.category === "films" && key === "name" ? "title" : key;
				const renderedContent = renderNestedContent(value, key, unwantedInfo);

				return (
					renderedContent && (
						<div key={key}>
							{formatKey(displayKey)}: {renderedContent}
						</div>
					)
				);
			})}
		</CardCustom>
	);
};

export const renderContent = (
	data: any,
	depth: number = 0,
	unwantedInfo: string[] = []
): React.ReactNode => {
	if (Array.isArray(data)) {
		return data.length > 0 ? renderArrayData(data, depth, unwantedInfo) : null;
	} else if (typeof data === "object" && data !== null) {
		return renderObjectData(data, unwantedInfo);
	} else if (data === "" || data === null || data === undefined) {
		return null;
	} else {
		return capitalizeFirstLetter(String(data));
	}
};
