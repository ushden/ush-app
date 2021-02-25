import { showLoading } from './../loading/loadingActions';
import { showAlert } from './../alert/alertActions';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ERROR, Message, SEND_MESSAGE, FETCH_MESSAGE } from '../types';
import { RootState } from '../rootReducer';
import { hideLoading } from '../loading/loadingActions';
import { db } from '../../libs/firebase';

const sendMessageAction = (payload: Message) => ({
	type: SEND_MESSAGE,
	payload,
});
const fetchMessagesAction = (payload: Message) => ({
	type: FETCH_MESSAGE,
	payload,
});

export const sendMessage = (
	message: Message,
	chatType: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			await db
				.collection(chatType)
				.doc(message.chatId)
				.collection('messages')
				.add(message)

				.catch((e) => dispatch(showAlert(e.message, ERROR)));

			dispatch(sendMessageAction(message));
			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
	};
};

export const fetchMessages = (
	chatId: string | undefined
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());
			const payload: any = [];

			await db
				.collection('publicChats')
				.doc(chatId)
				.collection('messages')
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						payload.push(doc.data());
					});
				});

			dispatch(fetchMessagesAction(payload));
			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.messages, ERROR));
			dispatch(hideLoading());
		}
	};
};
