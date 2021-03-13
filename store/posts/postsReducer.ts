import {
	ADD_LIKE,
	ADD_SHIT,
	CREATE_POST,
	FETCH_POSTS,
	GET_LIKE,
	GET_SHIT,
	PostsActions,
	PostsState,
	REMOVE_LIKE,
	REMOVE_SHIT,
} from '../types';

const initialState: PostsState = {
	post: {
		title: '',
		description: '',
		createAt: '',
		imageUrl: '',
		postId: '',
		likes: 0,
		shits: 0,
		author: {
			name: '',
			photoUrl: '',
			id: '',
			email: '',
		},
	},
	posts: [],
};

export const postsReducer = (
	state = initialState,
	action: PostsActions
): PostsState => {
	switch (action.type) {
		case CREATE_POST:
			return { ...state, post: { ...action.payload } };
		case FETCH_POSTS:
			return { ...state, posts: [...action.payload] };
		case ADD_LIKE:
			return {
				...state,
				post: { ...state.post, likes: state.post?.likes + 1 },
			};
		case REMOVE_LIKE:
			return {
				...state,
				post: { ...state.post, likes: state.post?.likes - 1 },
			};
		case GET_LIKE:
			return { ...state, post: { likes: action.payload } };
		case ADD_SHIT:
			return {
				...state,
				post: { ...state.post, shits: state.post?.shits + 1 },
			};
		case REMOVE_SHIT:
			return {
				...state,
				post: { ...state.post, shits: state.post?.shits - 1 },
			};
		case GET_SHIT:
			return { ...state, post: { shits: action.payload } };
		default:
			return state;
	}
};
