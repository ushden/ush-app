import { SIGN_OUT, SUCCSSES } from './../types';
import { hideLoading } from '../loading/loadingActions';
import { showLoading } from '../loading/loadingActions';
import { RootState } from '../rootReducer';
import { showAlert } from '../alert/alertActions';
import { auth, db, storage } from '../../libs/firebase';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import {
	ERROR,
	SIGN_IN_MEMBER,
	Member,
	SIGN_UP_MEMBER,
	SET_MEMBER,
	GET_MEMBER,
	FETCH_MEMBERS,
} from '../types';

const signUpAction = (payload: Member) => ({ type: SIGN_UP_MEMBER, payload });
const signInAction = (payload: Member) => ({ type: SIGN_IN_MEMBER, payload });
const setMemberAction = (payload: Member) => ({ type: SET_MEMBER, payload });
const getMemberAction = (payload: Member) => ({ type: GET_MEMBER, payload });
const fetchMembersAction = (payload: Member) => ({
	type: FETCH_MEMBERS,
	payload,
});
const signOutAction = () => ({ type: SIGN_OUT });

export const signOut = (): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			await auth.signOut();
			dispatch(signOutAction());
		} catch (error) {
			dispatch(showAlert(error.code, ERROR));
		}
	};
};

export const signUp = (
	name: string,
	email: string,
	password: any,
	photoURL: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			await auth
				.createUserWithEmailAndPassword(email, password)
				.then((user) => {
					if (user) {
						uploadMemberAvatar(photoURL, user.user?.uid).then((snapshot) => {
							snapshot?.ref.getDownloadURL().then(async (url) => {
								await user.user?.updateProfile({
									displayName: name,
									photoURL: url,
								});

								const payload: Member = {
									name: user.user?.displayName,
									email: user.user?.email,
									id: user.user?.uid,
									photoUrl: user.user?.photoURL,
								};

								dispatch(signUpAction(payload));
								dispatch(setMember(payload));
							});
						});
					}
				})
				.catch((error) => dispatch(showAlert(error.message, ERROR)));

			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
	};
};

export const signIn = (
	email: string,
	password: any
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		dispatch(showLoading());
		try {
			await auth
				.signInWithEmailAndPassword(email, password)
				.then((user) => {
					if (user) {
						const payload = {
							name: user.user?.displayName,
							email: user.user?.email,
							id: user.user?.uid,
							photoURL: user.user?.photoURL,
						};

						dispatch(signInAction(payload));
					}
				})
				.catch((e) => dispatch(showAlert(e.message, ERROR)));
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
		dispatch(hideLoading());
	};
};

export const setMember = (
	payload: any
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			await db.collection('users').doc(payload?.id).set(payload);

			dispatch(setMemberAction(payload));
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
		}
	};
};

export const getMember = (): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());
			const user = auth.currentUser;

			await db
				.collection('users')
				.doc(user?.uid)
				.get()
				.then((user) => {
					if (user.exists) {
						const payload = user.data();

						dispatch(getMemberAction(payload));
					}
				})
				.catch((e) => {
					dispatch(showAlert(e.message, ERROR));
				});
			dispatch(hideLoading());
		} catch (e) {
			dispatch(showAlert(e.message, ERROR));
			dispatch(hideLoading());
		}
	};
};

export const fetchMembers = (): ThunkAction<
	void,
	RootState,
	unknown,
	Action
> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());
			await db
				.collection('users')
				.get()
				.then((querySnapshot) => {
					const payload: Array<Member> = [];

					querySnapshot.forEach((doc) => {
						const user = doc.data();

						payload.push(user);
					});

					dispatch(fetchMembersAction(payload));
				})
				.catch((e) => {
					dispatch(showAlert(e.message, ERROR));
				});
			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
	};
};

const uploadMemberAvatar = async (uri: string, name: string | undefined) => {
	try {
		const response = await fetch(uri);
		const blob = await response.blob();
		const ref = storage.ref().child(`membersAvatars/${name}`);

		return ref.put(blob);
	} catch (error) {
		console.error(error.message);
	}
};

const deleteMemberAvatar = async (name: string | undefined) => {
	try {
		await storage
			.ref()
			.child(`membersAvatars/${name}`)
			.delete()
			.then(() => {
				console.log('avatar deleted');
			});
	} catch (error) {
		console.error(error.message);
	}
};

export const changePassword = (
	pass: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			await auth.currentUser?.updatePassword(pass).then(() => {
				dispatch(showAlert('Пароль успешно сменен', SUCCSSES));
			});

			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		}
	};
};

export const updateProfile = (
	displayName: string,
	email: string,
	photoUrl: string
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());
			const user = auth.currentUser;

			await deleteMemberAvatar(user?.uid);
			await uploadMemberAvatar(photoUrl, user?.uid).then((snapshot) => {
				snapshot?.ref.getDownloadURL().then((url) => {
					user
						?.updateProfile({
							displayName,
							photoURL: url,
						})
						.then(() => {
							user?.updateEmail(email).then(() => {
								updateMember();
							});
						});
				});
			});
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
		} finally {
			dispatch(showAlert('Профиль успешно обновлен!', SUCCSSES));

			dispatch(hideLoading());
		}
	};
};

const updateMember = async () => {
	const member = auth.currentUser;

	const payload: Member = {
		name: member?.displayName,
		email: member?.email,
		photoUrl: member?.photoURL,
		id: member?.uid,
	};

	await db
		.collection('users')
		.doc(member?.uid)
		.update(payload)
		.then(() => {
			console.log('DB update succsses');
		});
};
