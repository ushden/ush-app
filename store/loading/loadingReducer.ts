import { LoadingActions, HIDE_LOADING } from './../types';
import { LoadingState, SHOW_LOADING } from '../types';

const initialState: LoadingState = {
	loading: false,
};

export const loadingReducer = (
	state = initialState,
	action: LoadingActions
): LoadingState => {
	switch (action.type) {
		case SHOW_LOADING:
			return { loading: action.payload };

		case HIDE_LOADING:
			return {
				loading: action.payload,
			};

		default:
			return state;
	}
};
