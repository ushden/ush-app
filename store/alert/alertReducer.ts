import {
	AlertActions,
	SHOW_ERROR,
	AlertState,
	HIDE_ERROR,
	ERROR,
} from './../types';

const initialState: AlertState = {
	displayAlert: false,
	message: 'Error message',
	type: ERROR,
};

export const alertReducer = (
	state = initialState,
	action: AlertActions
): AlertState => {
	switch (action.type) {
		case SHOW_ERROR:
			return { ...state, ...action.payload };

		case HIDE_ERROR:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
