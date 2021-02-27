import {
	chatsAction,
	FETCH_PRIVATE_CHATS,
	Chats,
	FETCH_PUBLIC_CHATS,
	FETCH_PUBLIC_MESSAGE,
} from './../types';

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
	publicMessages: [
		{
			content: '',
			id: '',
			chatId: '',
			createdAt: '',
			member: {
				name: '',
				id: '',
				photoUrl: '',
				email: '',
			},
		},
	],
	privateMessages: [
		{
			content: '',
			id: '',
			chatId: '',
			createdAt: '',
			member: {
				name: '',
				id: '',
				photoUrl: '',
				email: '',
			},
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
		case FETCH_PRIVATE_CHATS:
			return {
				...state,
				privateChats: [...action.payload],
			};
		case FETCH_PUBLIC_MESSAGE:
			return { ...state };
		default:
			return state;
	}
};
