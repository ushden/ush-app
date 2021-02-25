import { serverTime } from './../libs/firebase';
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
export const FETCH_PUBLIC_CHATS = 'FETCH_PUBLIC_CHATS';
export const FETCH_PRIVATE_CHATS = 'FETCH_PRIVATE_CHATS';
export const ADD_CHAT = 'ADD_CHAT';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const CREATE_PRIVATE_CHAT = 'CREATE_PRIVATE_CHAT';

export const ERROR = 'red';
export const SUCCSSES = 'green';

export const PRIVATE_CHATS = 'privateChats';
export const PUBLIC_CHATS = 'publicChats';

export interface Message {
	content: string;
	id: string;
	chatId: string;
	sendTime: Time;
	serverTime: any;
	memberName: string;
	memberAvatarUrl: string;
	memberEmail: string;
	memberId: string;
}

export interface Time {
	month: string;
	day: string;
	hours: string;
	minutes: string;
}

export interface Messages {
	messages: Array<Message>;
}

interface sendMessageAction {
	type: typeof SEND_MESSAGE;
	payload: Message;
}

interface updateMessageAction {
	type: typeof FETCH_MESSAGE;
	payload: any;
}

export type MessageActions = sendMessageAction | updateMessageAction;

export interface PublicChat {
	chatId: string;
	chatName: string;
	chatAvatar: string;
	createTime: any;
	_chatType: string;
}

export interface PrivateChat {
	chatId: string;
	_chatType: string;
	createMemberId: string;
	membersName: Array<string>;
	membersPhotoUrl: Array<string>;
	membersId: Array<string>;
}

export interface Chats {
	publicChats: Array<PublicChat>;
	privateChats: Array<PrivateChat>;
}

interface fetchChatsAction {
	type: typeof FETCH_PUBLIC_CHATS;
	payload: Array<PublicChat>;
}

interface fetchPrivateChats {
	type: typeof FETCH_PRIVATE_CHATS;
	payload: Array<PrivateChat>;
}

interface addChatAction {
	type: typeof ADD_CHAT;
	payload: PublicChat;
}

interface createPrivateChat {
	type: typeof CREATE_PRIVATE_CHAT;
	payload: PrivateChat;
}

export type chatsAction =
	| fetchChatsAction
	| addChatAction
	| fetchPrivateChats
	| createPrivateChat;

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
