import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/interfaces/reduxItems.interface";
import { getAllGeneral, updateCategoryPage } from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { tabPanelInfo } from "./functions/RenderTabsContent";
import PaginationCustom from "./Pagination";
import "../css/home.css";

function Home({ categories, value }) {
	const dispatch = useDispatch<AppDispatch>();
	const state = useSelector((state: RootState) => state);
	const currentCategory = categories[value];

	React.useEffect(() => {
		dispatch(getAllGeneral(state.page));
	}, [dispatch, currentCategory, state.page]);

	const handlePageChange = (e, newPage: number) => {
		e.preventDefault();
		console.log(newPage);
		dispatch(updateCategoryPage(pagination[0], newPage));
	};

	const getPaginationForCategory = () => {
		if (currentCategory === "all") {
			return state.allInfo.pagination;
		} else {
			return [currentCategory, state[currentCategory].pagination];
		}
	};

	const pagination = getPaginationForCategory();

	return (
		<>
			<div className="pagination-container">
				{pagination && (
					<PaginationCustom
						count={pagination[1].totalPages}
						page={pagination[1].currentPage}
						onChange={handlePageChange}
					/>
				)}
			</div>
			{tabPanelInfo(categories, value, state)}
			<div className="pagination-container">
				{pagination && (
					<PaginationCustom
						count={pagination[1].totalPages}
						page={pagination[1].currentPage}
						onChange={handlePageChange}
					/>
				)}
			</div>
		</>
	);
}

export default Home;
