import React from "react";
import { Card, CardContent, CardActions } from "@mui/material";

const CardCustom = ({ children }) => {
	const handleRedirect = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};
	return (
		<Card variant="outlined">
			<CardActions onClick={handleRedirect}>
				<CardContent>{children}</CardContent>
			</CardActions>
		</Card>
	);
};

export default CardCustom;
