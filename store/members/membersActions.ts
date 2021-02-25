import { hideLoading } from '../loading/loadingActions';
import { showLoading } from '../loading/loadingActions';
import { RootState } from '../rootReducer';
import { showAlert } from '../alert/alertActions';
import { auth, db } from '../../libs/firebase';
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

export const signUp = (
	name: string,
	email: string,
	password: any
): ThunkAction<void, RootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(showLoading());

			await auth
				.createUserWithEmailAndPassword(email, password)
				.then((user) => {
					if (user) {
						user.user?.updateProfile({
							displayName: name,
							photoURL:
								'https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg',
						});
						return user;
					}
				})
				.then((user) => {
					const payload: Member = {
						name,
						email: user?.user?.email,
						id: user?.user?.uid,
						photoUrl:
							'https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg',
					};

					dispatch(signUpAction(payload));
					dispatch(setMember(payload));
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
			dispatch(showLoading());
			await db.collection('users').doc(payload?.id).set(payload);

			dispatch(setMemberAction(payload));
			dispatch(hideLoading());
		} catch (error) {
			dispatch(showAlert(error.message, ERROR));
			dispatch(hideLoading());
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
