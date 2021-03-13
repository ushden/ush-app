import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { increment, db, storage, auth, decrement } from '../../libs/firebase';
import { showAlert } from '../alert/alertActions';
import { hideLoading, showLoading } from '../loading/loadingActions';
import { RootState } from '../rootReducer';
import {
	ADD_LIKE,
	CREATE_POST,
	ERROR,
	FETCH_POSTS,
	GET_LIKE,
	APPRAISAL,
	Post,
	POSTS,
	SUCCSSES,
	LIKES,
	REMOVE_LIKE,
	ADD_SHIT,
	REMOVE_SHIT,
	GET_SHIT,
	SHITS,
} from '../types';

const createPostAction = (payload: Post) => ({ type: CREATE_POST, payload });
const fetchPostsAction = (payload: Array<Post>) => ({
	type: FETCH_POSTS,
	payload,
});
const addLikeAction = () => ({ type: ADD_LIKE });
const removeLikeAction = () => ({ type: REMOVE_LIKE });
const getLikeAction = (payload: number) => ({ type: GET_LIKE, payload });
const addShitAction = () => ({ type: ADD_SHIT });
const removeShitAction = () => ({ type: REMOVE_SHIT });
const getShitAction = (payload: number) => ({ type: GET_SHIT, payload });

const uploadPostImage = async (uri: string, name: string) => {
	try {
		const response = await fetch(uri);
		const blob = await response.blob();
		const ref = storage.ref().child(`membersAvatars/${name}`);

		return ref.put(blob);
	} catch (error) {
		console.error(error.message);
	}
};

export const createPost = (
	payload: Post
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			await uploadPostImage(payload?.imageUrl, payload?.title).then(
				(snapshot) => {
					snapshot?.ref.getDownloadURL().then((url) => {
						db.collection(POSTS)
							.doc(payload?.postId)
							.set({ ...payload, imageUrl: url })
							.then(() => {
								dispatch(createPostAction(payload));
								dispatch(showAlert('Пост успешно создан', SUCCSSES));
							});
					});
				}
			);

			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
	};
};

export const fetchPosts = (): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			await db
				.collection(POSTS)
				.limit(20)
				.orderBy('createAt', 'desc')
				.get()
				.then((snapshot) => {
					const payload: Array<Post> = [];

					snapshot.forEach((doc) => {
						const post = doc.data();

						payload.push(post);
					});

					dispatch(fetchPostsAction(payload));
				});

			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
	};
};

export const downloadImg = (
	url: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			let fileLocation = FileSystem.documentDirectory + 'test.jpg';
			FileSystem.downloadAsync(url, fileLocation)
				.then(async (res) => {
					const { status } = await Permissions.askAsync(
						Permissions.MEDIA_LIBRARY
					);
					if (status === 'granted') {
						const asset = await MediaLibrary.createAssetAsync(res.uri);
						await MediaLibrary.createAlbumAsync('MyImages', asset, false);
					}

					Sharing.shareAsync(fileLocation);
				})
				.then(() => {
					dispatch(showAlert('Загрузка завершена', SUCCSSES));

					dispatch(hideLoading());
				});
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
	};
};

export const addLike = (
	postId: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		const member = auth.currentUser;

		try {
			await db
				.collection(APPRAISAL)
				.doc(postId)
				.collection(LIKES)
				.doc(member?.uid)
				.set({ postId, isLike: true });
			await db.collection(POSTS).doc(postId).update({ likes: increment });
			dispatch(addLikeAction());
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};

export const removeLike = (
	postId: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		const member = auth.currentUser;

		try {
			await db
				.collection(APPRAISAL)
				.doc(postId)
				.collection(LIKES)
				.doc(member?.uid)
				.set({ postId, isLike: false });
			await db.collection(POSTS).doc(postId).update({ likes: decrement });
			dispatch(removeLikeAction());
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};

export const getLike = (
	postId: string
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
	try {
		await db
			.collection(POSTS)
			.doc(postId)
			.get()
			.then((doc) => {
				const post = doc.data();
				dispatch(getLikeAction(post?.likes));
			});
	} catch (error) {
		console.error(error.code, error.message);
	}
};
export const addShit = (
	postId: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		const member = auth.currentUser;

		try {
			await db
				.collection(APPRAISAL)
				.doc(postId)
				.collection(SHITS)
				.doc(member?.uid)
				.set({ postId, isShit: true });
			await db.collection(POSTS).doc(postId).update({ shits: increment });
			dispatch(addShitAction());
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};

export const removeShit = (
	postId: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		const member = auth.currentUser;

		try {
			await db
				.collection(APPRAISAL)
				.doc(postId)
				.collection(SHITS)
				.doc(member?.uid)
				.set({ postId, isShit: false });
			await db.collection(POSTS).doc(postId).update({ shits: decrement });
			dispatch(removeShitAction());
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};

export const getShit = (
	postId: string
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
	try {
		await db
			.collection(POSTS)
			.doc(postId)
			.get()
			.then((doc) => {
				const post = doc.data();
				dispatch(getShitAction(post?.shits));
			});
	} catch (error) {
		console.error(error.code, error.message);
	}
};
