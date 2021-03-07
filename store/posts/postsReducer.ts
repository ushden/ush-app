import { CREATE_POST, FETCH_POSTS, PostsActions, PostsState } from '../types';

const initialState: PostsState = {
	post: {
		title: '',
		description: '',
		createAt: '',
		imageUrl: '',
		postId: '',
		likes: 0,
		shits: 0,
		isLike: false,
		whoLiked: [],
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
		default:
			return state;
	}
};
