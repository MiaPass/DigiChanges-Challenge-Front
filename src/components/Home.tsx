import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllGeneral } from "../redux/actions";
import { AppDispatch } from "../redux/store";

import { tabPanelInfo } from "./functions/RenderTabsContent";
import NavBar from "./NavBar";
import "../css/nav.css";

function Home() {
	const dispatch = useDispatch<AppDispatch>();
	const { categories, allInfo, films, people, planets, starships, page } =
		useSelector((state: any) => state);

	React.useEffect(() => {
		if (allInfo.length === 0) dispatch(getAllGeneral(page));
	}, [dispatch, allInfo.length, page]);

	const [value, setValue] = React.useState<number>(0);

	const handleChangeValue = (e: React.SyntheticEvent, newValue: number) => {
		e.preventDefault();
		setValue(newValue);
	};

	return (
		<>
			<NavBar
				value={value}
				handleChangeValue={handleChangeValue}
				categories={categories}
			/>
			{tabPanelInfo(
				categories,
				value,
				allInfo,
				films,
				people,
				planets,
				starships
			)}
		</>
	);
}

export default Home;
