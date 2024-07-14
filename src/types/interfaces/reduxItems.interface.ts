export interface Action {
	type: string;
	payload?: any;
}

export interface Pagination {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
}

export interface CategoryData {
	items: any[];
	pagination: Pagination;
}

export interface RootState {
	allInfo: CategoryData;
	categories: string[];
	filtered: any[];
	films: CategoryData;
	people: CategoryData;
	planets: CategoryData;
	starships: CategoryData;
	theChosenOne: any;
	page: number;
}
