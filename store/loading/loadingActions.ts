import { HIDE_LOADING, LoadingActions } from './../types';
import { SHOW_LOADING } from '../types';

export const showLoading = (): LoadingActions => ({
	type: SHOW_LOADING,
	payload: true,
});
export const hideLoading = (): LoadingActions => ({
	type: HIDE_LOADING,
	payload: false,
});
