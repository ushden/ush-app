import {
	ADD_CHAT,
	chatsAction,
	FETCH_PRIVATE_CHATS,
	CREATE_PRIVATE_CHAT,
} from './../types';
import { Chats, FETCH_PUBLIC_CHATS } from '../types';

const initialState: Chats = {
	publicChats: [
		{
			chatId: '',
			chatName: '',
			chatAvatar: '',
			createTime: '',
			_chatType: 'publicChats',
		},
	],
	privateChats: [
		{
			chatId: '',
			createMemberId: '',
			_chatType: 'privateChats',
			membersName: [],
			membersPhotoUrl: [],
			membersId: [],
		},
	],
};

export const chatsReducer = (
	state = initialState,
	action: chatsAction
): Chats => {
	switch (action.type) {
		case FETCH_PUBLIC_CHATS:
			return { ...state, publicChats: [...action.payload] };
		// case ADD_CHAT:
		// 	return {
		// 		...state,
		// 		publicChats: [...state.publicChats, action.payload],
		// 	};
		case FETCH_PRIVATE_CHATS:
			return {
				...state,
				privateChats: [...action.payload],
			};
		// case CREATE_PRIVATE_CHAT:
		// 	return {
		// 		...state,
		// 		privateChats: [...state.privateChats, action.payload],
		// 	};
		default:
			return state;
	}
};
