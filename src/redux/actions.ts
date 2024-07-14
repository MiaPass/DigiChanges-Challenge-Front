import axios from "axios";
import Swal from "sweetalert2";
import { Dispatch } from "redux";

import "../css/swal.css";

let url = process.env.REACT_APP_API_URL;

async function getFilms(page: number) {
	const films = await axios.get(`${url}/api/films/?page=${page}`);
	return films;
}

async function getPeople(page: number) {
	const people = await axios.get(`${url}/api/people/?page=${page}`);
	return people;
}

async function getPlanets(page: number) {
	const planets = await axios.get(`${url}/api/planets/?page=${page}`);
	return planets;
}

async function getStarships(page: number) {
	const starships = await axios.get(`${url}/api/starships/?page=${page}`);
	return starships;
}

export function getAllGeneral(page: number) {
	return async function (dispatch: Dispatch) {
		try {
			let films = await getFilms(page);
			let people = await getPeople(page);
			let planets = await getPlanets(page);
			let starships = await getStarships(page);

			let response = [
				{ category: "films", data: films.data },
				{ category: "people", data: people.data },
				{ category: "planets", data: planets.data },
				{ category: "starships", data: starships.data },
			];

			dispatch({ type: "ALL_INFO", payload: response });
		} catch (err) {
			console.error(err);
			Swal.fire({
				title: "Something went wrong",
				confirmButtonText: "Accept",
				customClass: {
					popup: "body-alert",
					confirmButton: "button-alert",
				},
				showClass: {
					popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
					`,
				},
				hideClass: {
					popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
					`,
				},
			});
		}
	};
}

/* ---------- NAME ---------- */

async function getFilmByFilter(page: number, content: any) {
	const films = await axios.get(
		`${url}/api/films/?page=${page}&&field=${content.field}&&value=${content.value}`
	);

	return films;
}

async function getPeopleByFilter(page: number, content: any) {
	const people = await axios.get(
		`${url}/api/people/?page=${page}&&field=${content.field}&&value=${content.value}`
	);
	return people;
}

async function getPlanetByFilter(page: number, content: any) {
	const planets = await axios.get(
		`${url}/api/planets/?page=${page}&&field=${content.field}&&value=${content.value}`
	);

	return planets;
}

async function getStarshipByFilter(page: number, content: any) {
	const starships = await axios.get(
		`${url}/api/starships/?page=${page}&&field=${content.field}&&value=${content.value}`
	);
	return starships;
}

export function getByFilter(content, page) {
	return async function (dispatch: Dispatch) {
		try {
			let result;
			let films = await getFilmByFilter(page, content);
			let people = await getPeopleByFilter(page, content);
			let planets = await getPlanetByFilter(page, content);
			let starships = await getStarshipByFilter(page, content);

			result = [
				...(films?.data || []),
				...(people?.data || []),
				...(planets?.data || []),
				...(starships?.data || []),
			];

			if (result instanceof Array && result.length === 0) {
				Swal.fire({
					title: "Nothing found, try again",
					confirmButtonText: "Accept",
					customClass: {
						popup: "body-alert",
						confirmButton: "button-alert",
					},
					showClass: {
						popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
					`,
					},
					hideClass: {
						popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
					`,
					},
				});
			}
			dispatch({ type: "GET_BY_FILTER", payload: result });
		} catch (err) {
			console.error("Error in getByFilter:", err);
			Swal.fire({
				title: "Something went wrong",
				confirmButtonText: "Accept",
				customClass: {
					popup: "body-alert",
					confirmButton: "button-alert",
				},
				showClass: {
					popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
					`,
				},
				hideClass: {
					popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
					`,
				},
			});
		}
	};
}

/* ---------- The One ---------- */

export function resetTheOne(payload) {
	return function (dispatch) {
		dispatch({ type: "RESET_THE_ONE", payload: payload });
	};
}

/* ---------- Filtered ---------- */

export function resetFiltered(payload) {
	return function (dispatch) {
		dispatch({ type: "RESET_FILTERED", payload: payload });
	};
}

/* ---------- Filtered ---------- */

export function getOne(page, category, name) {
	return async function (dispatch: Dispatch) {
		try {
			const response = await axios.get(
				`${url}/api/${category}/?page=${page}&&field=name&&value=${name}`
			);

			dispatch({ type: "GET_ONE", payload: response.data });
		} catch (err) {
			console.error(err);
			Swal.fire({
				title: "Something went wrong",
				confirmButtonText: "Accept",
				customClass: {
					popup: "body-alert",
					confirmButton: "button-alert",
				},
				showClass: {
					popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
					`,
				},
				hideClass: {
					popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
					`,
				},
			});
		}
	};
}

/* ---------- Pagination ---------- */

export function setPage(payload) {
	return function (dispatch) {
		dispatch({ type: "SET_PAGE", payload: payload });
	};
}

export function updateCategoryPage(category: string, page: number) {
	return async function (dispatch: Dispatch) {
		try {
			const response = await axios.get(`${url}/api/${category}/?page=${page}`);
			let paginationInfo = response.data.shift();
			let newData = response.data;
			let result = {
				categoryName: category,
				newData,
				newPagination: paginationInfo,
			};
			console.log(result);
			dispatch({ type: "UPDATE_CATEGORY_PAGE", payload: result });
		} catch (err) {
			console.error(err);
			Swal.fire({
				title: "Something went wrong",
				confirmButtonText: "Accept",
				customClass: {
					popup: "body-alert",
					confirmButton: "button-alert",
				},
				showClass: {
					popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
					`,
				},
				hideClass: {
					popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
					`,
				},
			});
		}
	};
}
