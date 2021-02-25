import {
	PrivateChat,
	FETCH_PRIVATE_CHATS,
	CREATE_PRIVATE_CHAT,
	PRIVATE_CHATS,
	PUBLIC_CHATS,
} from './../types';
import { auth, serverTime } from './../../libs/firebase';
import { ADD_CHAT, PublicChat, ERROR, FETCH_PUBLIC_CHATS } from '../types';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { showAlert } from '../alert/alertActions';
import { hideLoading, showLoading } from '../loading/loadingActions';
import { db } from '../../libs/firebase';

const fetchChatsAction = (payload: Array<PublicChat>) => ({
	type: FETCH_PUBLIC_CHATS,
	payload,
});
const fetchPrivateChatsAction = (payload: Array<PrivateChat>) => ({
	type: FETCH_PRIVATE_CHATS,
	payload,
});
const addChatAction = (payload: PublicChat) => ({ type: ADD_CHAT, payload });
const createPrivateChatAction = (payload: PrivateChat) => ({
	type: CREATE_PRIVATE_CHAT,
	payload,
});

export const fetchChats = (): ThunkAction<
	void,
	RootState,
	unknown,
	Action
> => async (dispatch) => {
	try {
		dispatch(showLoading());
		const payload: Array<PublicChat> = [];

		await db
			.collection('publicChats')
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
		dispatch(showAlert(error.message, ERROR));
		dispatch(hideLoading());
	}
};

export const fetchPrivateChats = (): ThunkAction<
	void,
	RootState,
	unknown,
	Action
> => async (dispatch) => {
	try {
		dispatch(showLoading());
		const payload: Array<PrivateChat> = [];

		await db
			.collection(PRIVATE_CHATS)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data: any = doc.data();
					payload.push(data);
				});

				dispatch(fetchPrivateChatsAction(payload));
			});

		dispatch(hideLoading());
	} catch (error) {
		dispatch(showAlert(error.message, ERROR));
		dispatch(hideLoading());
	}
};

export const addChat = (
	chatName: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			const member: any = auth.currentUser;
			const payload: PublicChat = {
				chatName,
				_chatType: PUBLIC_CHATS,
				chatId: member?.uid,
				createTime: serverTime,
				chatAvatar:
					'https://business.ucr.edu/sites/g/files/rcwecm2116/files/styles/form_preview/public/icon-group.png?itok=3LzNDSRI',
			};

			await db
				.collection(PUBLIC_CHATS)
				.doc(member?.uid)
				.set(payload)
				.catch((e) => dispatch(showAlert(e.message + 'addChat', ERROR)));

			// dispatch(addChatAction(payload));
			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message + 'addChat2', ERROR));
			dispatch(hideLoading());
		}
	};
};

export const createPrivateChat = (
	chatInfo: PrivateChat
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			await db
				.collection(PRIVATE_CHATS)
				.doc(chatInfo.chatId)
				.set(chatInfo)
				.catch((e) => dispatch(showAlert(e.message, ERROR)));

			// dispatch(createPrivateChatAction(chatInfo));
			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
	};
};