import CardCustom from "../Card";

export const renderContent = (
	data: any,
	depth: number = 0,
	unwantedInfo: any[]
): React.ReactNode => {
	const itemsWanted = [
		"name",
		"starship_model",
		"films",
		"planets",
		"planet",
		"characters",
		"starships",
		"category",
	];

	const renderNestedContent = (value: any, key: string): React.ReactNode => {
		if (value instanceof Array) {
			if (value.length === 0) return null;
			const displayItems = value.slice(0, 3);
			const remainingCount = value.length - 3;
			if (!unwantedInfo.includes("_id")) {
				return (
					<span>
						{displayItems.map((item, index) => (
							<span key={index}>
								{item.name || JSON.stringify(item)}
								{index < displayItems.length - 1 ? ", " : ""}
							</span>
						))}
						{remainingCount > 0 ? `, ...` : ""}
					</span>
				);
			} else {
				return (
					<span>
						{value.map((item, index) => (
							<span key={index}>
								{item.name || JSON.stringify(item)}
								{index < value.length - 1 ? ", " : ""}
							</span>
						))}
					</span>
				);
			}
		} else if (typeof value === "object" && value !== null) {
			if (key === "features") {
				return (
					<div>
						{Object.entries(value).map(([subKey, subValue]) => {
							if (subKey === "_id") return null;
							return (
								<div key={subKey}>
									{subKey
										.split("_")
										.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
										.join(" ")}
									:{" "}
									{typeof subValue === "string"
										? subValue
										: JSON.stringify(subValue)}
								</div>
							);
						})}
					</div>
				);
			}
			return value.name || JSON.stringify(value);
		} else if (value === "" || value === null || value === undefined) {
			return null;
		} else {
			let item = String(value);
			return item.charAt(0).toUpperCase() + item.slice(1);
		}
	};

	if (data instanceof Array && data.length > 0) {
		let filteredItem = [];
		filteredItem = data.filter(Boolean);
		let unwanted = unwantedInfo.includes("_id") ? unwantedInfo : [];

		return (
			<>
				{filteredItem.map((item, index) => {
					if (item.hasOwnProperty("currentPage")) {
						return null;
					} else {
						return (
							<span className="outer-box" key={item._id || index}>
								{renderContent(item, depth + 1, unwanted)}
							</span>
						);
					}
				})}
			</>
		);
	} else if (data instanceof Array && data.length === 0) {
		return null;
	} else if (typeof data === "object" && data !== null) {
		if (data.currentPage) {
			return null;
		} else {
			let classNameDetails = !unwantedInfo.includes("_id")
				? ""
				: "details-content";
			return (
				<CardCustom nameClass={classNameDetails}>
					{Object.entries(data).map(([key, value]) => {
						if (!unwantedInfo.includes("_id") && !itemsWanted.includes(key))
							return null;

						if (unwantedInfo.includes(key)) return null;
						if (key === "category" && value === "films") return null;
						if (value === "" || value === null || value === undefined)
							return null;

						let displayKey = key;
						if (data.category === "films" && key === "name") {
							displayKey = "title";
						}

						const renderedContent = renderNestedContent(value, key);
						if (renderedContent === null) return null;

						return (
							<div key={key}>
								{displayKey
									.split("_")
									.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
									.join(" ")}
								: {renderedContent}
							</div>
						);
					})}
				</CardCustom>
			);
		}
	} else if (data === "" || data === null || data === undefined) {
		return null;
	} else {
		let item = String(data);
		return item.charAt(0).toUpperCase() + item.slice(1);
	}
};
