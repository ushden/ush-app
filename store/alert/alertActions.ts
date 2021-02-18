import { AlertActions, SHOW_ERROR, HIDE_ERROR } from './../types';

export const showAlert = (message: string, type: string): AlertActions => {
	const payload = {
		message,
		type,
		displayAlert: true,
	};
	return {
		type: SHOW_ERROR,
		payload,
	};
};

export const hideAlert = () => {
	const payload = {
		displayAlert: false,
		type: '',
		message: '',
	};
	return {
		type: HIDE_ERROR,
		payload,
	};
};
