import {
	SIGN_UP_MEMBER,
	MembersActions,
	SET_MEMBER,
	GET_MEMBER,
	SIGN_IN_MEMBER,
	MembersState,
	FETCH_MEMBERS,
	SIGN_OUT,
} from '../types';

const initialState: MembersState = {
	member: {
		name: '',
		email: '',
		photoUrl: '',
		id: '',
		about: '',
		pushToken: '',
	},
	members: [],
};

export const membersReducer = (
	state = initialState,
	action: MembersActions
): MembersState => {
	switch (action.type) {
		case SIGN_UP_MEMBER:
			return {
				...state,
				member: { ...state.member, ...action.payload },
			};
		case SIGN_IN_MEMBER:
			return {
				...state,
				member: { ...state.member, ...action.payload },
			};
		case SET_MEMBER:
			return {
				...state,
				member: { ...state.member, ...action.payload },
			};
		case GET_MEMBER:
			return {
				...state,
				member: { ...state.member, ...action.payload },
			};
		case FETCH_MEMBERS:
			return { ...state, members: [...action.payload] };
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};
