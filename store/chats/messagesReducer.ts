import { SEND_MESSAGE, MessageActions, FETCH_MESSAGE } from './../types';
import { Messages } from '../types';

const initialState: Messages = {
	messages: [
		{
			content: '',
			id: '',
			chatId: '',
			sendTime: '',
			memberName: '',
			memberAvatarUrl: '',
			memberEmail: '',
			memberId: '',
		},
	],
};

export const messagesReducer = (
	state = initialState,
	action: MessageActions
): Messages => {
	switch (action.type) {
		case SEND_MESSAGE:
			return { ...state, messages: [...state.messages, action.payload] };
		case FETCH_MESSAGE:
			return { ...state, messages: [...action.payload] };
		default:
			return state;
	}
};
