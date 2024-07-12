import axios from "axios";
import { Dispatch } from "redux";

// const url = "https://digichanges-challenge-back-m812.onrender.com";
let url = "localhost:8080";

async function getFilms(page: number) {
	const films = await axios.get(`${url}/api/films/?page=${page}`);
	return films.data;
}

async function getPeople(page: number) {
	const people = await axios.get(`${url}/api/people/?page=${page}`);
	return people.data;
}

async function getPlanets(page: number) {
	const planets = await axios.get(`${url}/api/planets/?page=${page}`);
	return planets.data;
}

async function getStarships(page: number) {
	const starships = await axios.get(`${url}/api/starships/?page=${page}`);
	return starships.data;
}

export function getAllGeneral(page: number) {
	return async function (dispatch: Dispatch) {
		try {
			let films = await getFilms(page);
			let people = await getPeople(page);
			let planets = await getPlanets(page);
			let starships = await getStarships(page);

			let response = [
				{ category: `films`, data: [...films] },
				{ category: `people`, data: [...people] },
				{ category: `planets`, data: [...planets] },
				{ category: `starships`, data: [...starships] },
			];

			dispatch({ type: `ALL_INFO`, payload: response });
		} catch (err) {
			console.error(err);
			dispatch({
				type: `FETCH_ERROR`,
				payload: `Ups! Something went wrong...`,
			});
		}
	};
}
