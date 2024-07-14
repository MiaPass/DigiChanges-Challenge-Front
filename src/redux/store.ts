import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
	Store,
} from "redux";
import { thunk as ThunkMiddleware, ThunkDispatch } from "redux-thunk";
import reducer from "./reducer";

import { RootState } from "../types/interfaces/reduxItems.interface";

export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<RootState> = createStore(
	reducer,
	composeEnhancers(applyMiddleware(ThunkMiddleware))
);

export default store;
