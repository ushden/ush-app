import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { db, storage } from '../../libs/firebase';
import { showAlert } from '../alert/alertActions';
import { hideLoading, showLoading } from '../loading/loadingActions';
import { RootState } from '../rootReducer';
import {
	CREATE_POST,
	ERROR,
	FETCH_POSTS,
	Post,
	POSTS,
	SUCCSSES,
} from '../types';

const createPostAction = (payload: Post) => ({ type: CREATE_POST, payload });
const fetchPostsAction = (payload: Array<Post>) => ({
	type: FETCH_POSTS,
	payload,
});

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

export const addLike = () => {};
