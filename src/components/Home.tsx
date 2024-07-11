/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Nav from "./NavBar";
import { useDispatch, useSelector } from "react-redux";

import { getAllGeneral, getCategories } from "../redux/actions";
import { RootState, AppDispatch } from "../redux/store";

function Home() {
	const [value, setValue] = React.useState<number>(0);

	const handleChangeValue = (e: React.SyntheticEvent, newValue: number) => {
		e.preventDefault();
		setValue(newValue);
	};
	const dispatch = useDispatch<AppDispatch>();

	const categories = useSelector((state: RootState) => state.categories);
	const allInfo = useSelector((state: RootState) => state.allInfo);
	const films = useSelector((state: RootState) => state.films);
	const people = useSelector((state: RootState) => state.people);
	const planets = useSelector((state: RootState) => state.planets);
	const starships = useSelector((state: RootState) => state.starships);

	React.useEffect(() => {
		if (allInfo.length <= 0)
			dispatch(getAllGeneral()).then(() => {
				dispatch(getCategories());
			});
	}, [dispatch, allInfo.length]);

	return (
		<>
			<Nav
				categories={categories}
				value={value}
				handleChangeValue={handleChangeValue}
			/>
		</>
	);
}

export default Home;
