import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../store/alert/alertActions';
import { RootState } from '../store/rootReducer';

export const Alert = () => {
	const dispatch = useDispatch();
	const { displayAlert, message, type } = useSelector(
		(state: RootState) => state.alert
	);

	return (
		<Snackbar
			visible={displayAlert}
			style={{ backgroundColor: type }}
			onDismiss={() => dispatch(hideAlert())}
			action={{ label: 'Ok', onPress: () => dispatch(hideAlert()) }}>
			{message}
		</Snackbar>
	);
};
