import React from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../redux/store";
import { getByFilter } from "../../redux/actions";

import { IconButton, MenuItem, Paper, Select, InputBase } from "@mui/material/";

import { Search as SearchIcon } from "@mui/icons-material";
import Swal from "sweetalert2";

import "../../css/swal.css";

export default function Search({ page }) {
	const dispatch = useDispatch<AppDispatch>();
	let [fieldForm, setFieldForm] = React.useState("");
	let [valueForm, setValueForm] = React.useState("");

	const handleFieldChange = (e) => {
		e.preventDefault();
		setFieldForm(e.target.value);
	};

	const handleValueChange = (e) => {
		e.preventDefault();
		setValueForm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (fieldForm === "title") fieldForm = "name";
		if (fieldForm === "model") fieldForm = "starship_model";

		const searchForm = { field: fieldForm, value: valueForm };
		if (fieldForm === "" || valueForm === "") {
			Swal.fire({
				title: "Both fields are required",
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
		} else {
			dispatch(getByFilter(searchForm, page));
		}
	};

	return (
		<Paper
			onSubmit={handleSubmit}
			component="form"
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				width: 400,
				borderColor: "secondary.main",
			}}
			className="search-form"
		>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={fieldForm}
				onChange={handleFieldChange}
				sx={{ minWidth: 120, border: 0 }}
			>
				<MenuItem value="name">Name</MenuItem>
				<MenuItem value="title">Title</MenuItem>
				<MenuItem value="episode">Episode</MenuItem>
				<MenuItem value="terrain">Terrain</MenuItem>
				<MenuItem value="model">Model</MenuItem>
			</Select>
			{fieldForm === "" ? (
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder={"Select category"}
					disabled
					onChange={handleValueChange}
					value={valueForm}
				/>
			) : (
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder={`Enter ${fieldForm}...`}
					onChange={handleValueChange}
					value={valueForm}
				/>
			)}

			<IconButton
				onClick={handleSubmit}
				type="button"
				sx={{ p: "10px" }}
				aria-label="search"
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}
