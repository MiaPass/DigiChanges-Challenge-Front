import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../css/card.css";

const CardCustom = ({ children, nameClass }) => {
	const navigate = useNavigate();
	let needed = [];

	for (let child of children) {
		if (child !== null && child.key === "category") {
			needed[0] = child.props.children[2].toLowerCase();
		}
		if (
			(child !== null && child.key === "name") ||
			(child !== null && child.key === "title")
		)
			needed[1] = child.props.children[2];
	}

	const handleClick = () => {
		needed[0] = needed[0] === undefined ? "films" : needed[0];
		const name = needed[1].replace(/\s+/g, "_").toLowerCase();
		navigate(`/${needed[0]}/${name}`);
	};

	return (
		<Card
			variant="outlined"
			className={`card ${nameClass}`}
			onClick={handleClick}
		>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default CardCustom;
