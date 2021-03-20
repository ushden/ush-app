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
			membersToken: [],
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
			image: '',
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
			image: '',
			member: {
				name: '',
				id: '',
				photoUrl: '',
				email: '',
			},
		},
	],
	isPrivateChatsLoaded: false,
	isPublicChatsLoaded: false,
};

export const chatsReducer = (
	state = initialState,
	action: chatsAction
): Chats => {
	switch (action.type) {
		case FETCH_PUBLIC_CHATS:
			return {
				...state,
				publicChats: [...action.payload],
				isPublicChatsLoaded: true,
			};
		case FETCH_PRIVATE_CHATS:
			return {
				...state,
				privateChats: [...action.payload],
				isPrivateChatsLoaded: true,
			};
		case FETCH_PUBLIC_MESSAGE:
			return { ...state };
		default:
			return state;
	}
};
