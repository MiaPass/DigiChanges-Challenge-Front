import { RootState } from "../types/interfaces/rootState.interface";

import { Action } from "../types/interfaces/actions.interface";

const initialState: RootState = {
	allInfo: [],
	categories: ["all"],
	films: [],
	people: [],
	planets: [],
	starships: [],
	theOne: {},
	page: 1,
};

export default function reducer(
	state = initialState,
	action: Action
): RootState {
	switch (action.type) {
		case "ALL_INFO":
			let result = {
				info: [],
				categories: [],
				films: [],
				people: [],
				planets: [],
				starships: [],
			};

			for (let one of action.payload) {
				if (one.category === "films") {
					result.films = [...one.data];
				} else if (one.category === "people") {
					result.people = [...one.data];
				} else if (one.category === "planets") {
					result.planets = [...one.data];
				} else if (one.category === "starships") {
					result.starships = [...one.data];
				}
				result.categories.push(one.category);
				result.info = [...one.data];
			}

			return {
				...state,
				allInfo: result.info,
				categories: [...state.categories, ...result.categories],
				films: result.films,
				people: result.people,
				planets: result.planets,
				starships: result.starships,
			};

		default:
			return state;
	}
}
