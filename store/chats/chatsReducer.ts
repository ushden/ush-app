import { ADD_CHAT, chatsAction } from './../types';
import { Chats, FETCH_CHATS } from '../types';

const initialState: Chats = {
	chats: [
		{
			chatId: '',
			chatName: '',
			chatAvatr: '',
			messages: [
				{
					title: '',
					timeStamp: '',
					id: '',
					memberName: '',
					photoURL: '',
					email: '',
				},
			],
		},
	],
};

export const chatsReducer = (
	state = initialState,
	action: chatsAction
): Chats => {
	switch (action.type) {
		case FETCH_CHATS:
			return { ...state, chats: [...action.payload] };
		case ADD_CHAT:
			return { ...state, chats: [...state.chats, ...action.payload] };
		default:
			return state;
	}
};
