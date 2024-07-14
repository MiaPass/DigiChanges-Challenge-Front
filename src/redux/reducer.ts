import {
	RootState,
	Action,
	CategoryData,
	Pagination,
} from "../types/interfaces/reduxItems.interface";

const initialPagination: Pagination = {
	currentPage: 1,
	totalPages: 1,
	totalItems: 0,
	itemsPerPage: 12,
};

const initialCategoryData: CategoryData = {
	items: [],
	pagination: initialPagination,
};

const initialState: RootState = {
	allInfo: initialCategoryData,
	categories: ["all", "films", "people", "planets", "starships"],
	filtered: [],
	films: initialCategoryData,
	people: initialCategoryData,
	planets: initialCategoryData,
	starships: initialCategoryData,
	theChosenOne: [],
	page: 1,
};

export default function reducer(
	state = initialState,
	action: Action
): RootState {
	switch (action.type) {
		case "ALL_INFO":
			let allItems: any[] = [];
			let updatedCategories: { [key: string]: CategoryData } = {};

			for (let item of action.payload) {
				const [paginationInfo, ...data] = item.data;
				allItems = [...allItems, ...data];
				updatedCategories[item.category] = {
					items: data,
					pagination: {
						currentPage: parseInt(paginationInfo.currentPage),
						totalPages: parseInt(paginationInfo.totalPages),
						totalItems: parseInt(paginationInfo.totalItems),
						itemsPerPage: parseInt(paginationInfo.itemsPerPage),
					},
				};
			}

			return {
				...state,
				films: updatedCategories.films || state.films,
				people: updatedCategories.people || state.people,
				planets: updatedCategories.planets || state.planets,
				starships: updatedCategories.starships || state.starships,
			};

		case "GET_BY_FILTER":
			return {
				...state,
				filtered: action.payload,
			};

		case "RESET_THE_ONE":
			return {
				...state,
				theChosenOne: [],
			};

		case "RESET_FILTERED":
			return {
				...state,
				filtered: [],
			};

		case "GET_ONE":
			return {
				...state,
				theChosenOne: action.payload,
			};

		case "SET_PAGE":
			return {
				...state,
				page: action.payload,
			};

		case "UPDATE_CATEGORY_PAGE":
			let { categoryName, newData, newPagination } = action.payload;

			return {
				...state,
				[categoryName]: {
					items: newData,
					pagination: newPagination,
				},
			};

		default:
			return state;
	}
}
