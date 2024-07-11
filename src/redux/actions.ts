// src/redux/actions.ts

import axios from "axios";
import { Dispatch } from "redux";

export function getAllGeneral() {
	return async function (dispatch: Dispatch) {
		try {
			const films = await axios.get(
				"https://digichanges-challenge-back.onrender.com/api/films"
			);
			const people = await axios.get(
				"https://digichanges-challenge-back.onrender.com/api/people"
			);
			const planets = await axios.get(
				"https://digichanges-challenge-back.onrender.com/api/planets"
			);
			const starships = await axios.get(
				"https://digichanges-challenge-back.onrender.com/api/starships"
			);

			// console.log("films:", films.data);
			// console.log("people:", people.data);
			// console.log("planets:", planets.data);
			// console.log("starships:", starships.data);

			let response = [
				...films.data,
				...people.data,
				...planets.data,
				...starships.data,
			];

			console.log(response);

			dispatch({ type: "ALL_INFO", payload: response });
		} catch (err) {
			console.log(err);
			alert("Ups! Something went wrong...");
		}
	};
}

export function getCategories() {
	return async function (dispatch: Dispatch) {
		dispatch({ type: "CATEGORIES" });
	};
}
