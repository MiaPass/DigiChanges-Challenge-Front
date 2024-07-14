import { Pagination } from "@mui/material";

function PaginationCustom({ count, page, onChange }) {
	return (
		<Pagination
			className="pagination"
			count={count}
			page={page}
			onChange={onChange}
			variant="outlined"
			color="secondary"
			siblingCount={0}
		/>
	);
}

export default PaginationCustom;
