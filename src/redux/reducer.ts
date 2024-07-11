// src/redux/reducer.ts

import { RootState } from "./store"; // Adjust the import path as needed

const initialState: RootState = {
	allInfo: [],
	categories: ["all"],
	films: [],
	filteredFilms: [],
	people: [],
	filteredPeople: [],
	planets: [],
	filteredPlanets: [],
	starships: [],
	filteredStarships: [],
	page: 1,
};

interface Action {
	type: string;
	payload?: any;
}

export default function reducer(
	state = initialState,
	action: Action
): RootState {
	switch (action.type) {
		case "ALL_INFO":
			return {
				...state,
				allInfo: action.payload,
			};
		case "CATEGORIES":
			const newCategories = [...state.categories];
			for (let info of state.allInfo) {
				if (!newCategories.includes(info.category)) {
					newCategories.push(info.category);
				}
			}
			return {
				...state,
				categories: newCategories,
			};
		default:
			return state;
	}
}
