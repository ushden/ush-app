import { auth, serverTime } from './../../libs/firebase';
import { ADD_CHAT, Chat, ERROR, FETCH_CHATS } from '../types';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { showAlert } from '../alert/alertActions';
import { hideLoading, showLoading } from '../loading/loadingActions';
import { db } from '../../libs/firebase';

const fetchChatsAction = (payload: Array<Chat>) => ({
	type: FETCH_CHATS,
	payload,
});
const addChatAction = (payload: Chat) => ({ type: ADD_CHAT, payload });

export const fetchChats = (): ThunkAction<
	void,
	RootState,
	unknown,
	Action
> => async (dispatch) => {
	try {
		dispatch(showLoading());
		const payload: Array<Chat> = [];

		await db
			.collection('chats')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data: any = doc.data();
					payload.push(data);
				});

				dispatch(fetchChatsAction(payload));
			});

		dispatch(hideLoading());
	} catch (error) {
		dispatch(showAlert(error.message + 'fetchChat', ERROR));
		dispatch(hideLoading());
	}
};

export const addChat = (
	chatName: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			const member = auth.currentUser;
			const payload: Chat = {
				chatName,
				chatId: member?.uid,
				createTime: serverTime,
				chatAvatar:
					'https://business.ucr.edu/sites/g/files/rcwecm2116/files/styles/form_preview/public/icon-group.png?itok=3LzNDSRI',
			};

			await db
				.collection('chats')
				.doc(member?.uid)
				.set(payload)
				.catch((e) => dispatch(showAlert(e.message + 'addChat', ERROR)));

			dispatch(addChatAction(payload));
			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message + 'addChat2', ERROR));
			dispatch(hideLoading());
		}
	};
};
