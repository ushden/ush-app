import firebase from 'firebase';

export const SIGN_UP_MEMBER = 'SIGN_UP_MEMBER';
export const SIGN_IN_MEMBER = 'SIGN_IN_MEMBER';
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const SET_MEMBER = 'SET_MEMBER';
export const GET_MEMBER = 'GET_MEMBER';
export const FETCH_MEMBERS = 'FETCH_MEMBERS';
export const FETCH_CHATS = 'FETCH_CHATS';
export const ADD_CHAT = 'ADD_CHAT';

export const ERROR = 'red';
export const SUCCSSES = 'green';

export interface Message {
	title: string;
	timeStamp: string;
	id: string;
	memberName: string;
	photoURL: string;
	email: string;
}

export interface Chat {
	chatId: string;
	chatName: string;
	chatAvatr: string;
	messages: Array<Message>;
}

export interface Chats {
	chats: Array<Chat>;
}

interface fetchChatsAction {
	type: typeof FETCH_CHATS;
	payload: Array<Chat>;
}

interface addChatAction {
	type: typeof ADD_CHAT;
	payload: Array<Chat>;
}

export type chatsAction = fetchChatsAction | addChatAction;

export type Member =
	| {
			name: string | null | undefined;
			id: string | undefined;
			email: string | null | undefined;
			photoUrl?: string | null | undefined;
	  }
	| firebase.firestore.DocumentData
	| undefined;

export interface MembersState {
	members: Array<Member>;
	member: Member;
}

interface signUpAction {
	type: typeof SIGN_UP_MEMBER;
	payload: MembersState;
}

interface signInAction {
	type: typeof SIGN_IN_MEMBER;
	payload: MembersState;
}

interface setMemberAction {
	type: typeof SET_MEMBER;
	payload: MembersState;
}

interface getMemberAction {
	type: typeof GET_MEMBER;
	payload: MembersState;
}

interface fetchMembersAction {
	type: typeof FETCH_MEMBERS;
	payload: Array<Member>;
}

export type MembersActions =
	| signUpAction
	| setMemberAction
	| signInAction
	| getMemberAction
	| fetchMembersAction;

export interface LoadingState {
	loading: boolean;
}

interface showLoadingAction {
	type: typeof SHOW_LOADING;
	payload: boolean;
}

interface hideLoadingAction {
	type: typeof HIDE_LOADING;
	payload: boolean;
}

export type LoadingActions = showLoadingAction | hideLoadingAction;

export interface AlertState {
	displayAlert: boolean;
	message?: string;
	type?: string;
}

interface showAlert {
	type: typeof SHOW_ERROR;
	payload: AlertState;
}

interface hideAlert {
	type: typeof HIDE_ERROR;
	payload: AlertState;
}

export type AlertActions = showAlert | hideAlert;
