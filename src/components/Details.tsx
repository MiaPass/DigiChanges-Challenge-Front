import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../types/interfaces/reduxItems.interface";
import { AppDispatch } from "../redux/store";
import { getOne } from "../redux/actions";

import { renderContent } from "./functions/RenderComplexItems";

import { Box } from "@mui/material";

function Details() {
	const { category, name } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const page = useSelector((state: RootState) => state.page);
	const theChosenOne = useSelector((state: RootState) => state.theChosenOne);

	React.useEffect(() => {
		if (theChosenOne instanceof Array && theChosenOne.length === 0) {
			dispatch(getOne(page, category, name));
		}
	}, [category, dispatch, name, page, theChosenOne]);

	let unwantedInfo = ["_id", "__v", "url", "release_date"];

	return (
		<Box>
			<div className="content-div">
				<div style={{ width: "100%" }} className="box-div">
					{renderContent(theChosenOne, 0, unwantedInfo)}
				</div>
			</div>
		</Box>
	);
}

export default Details;
