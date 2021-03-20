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
export const SIGN_OUT = 'SIGN_OUT';
export const FETCH_PUBLIC_MESSAGE = 'FETCH_PUBLIC_MESSAGE';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const GET_LIKE = 'GET_LIKE';
export const ADD_SHIT = 'ADD_SHIT';
export const REMOVE_SHIT = 'REMOVE_SHIT';
export const GET_SHIT = 'GET_SHIT';

export const ERROR = 'darkred';
export const SUCCSSES = '#48aa48';

export const PRIVATE_CHATS = 'privateChats';
export const PUBLIC_CHATS = 'publicChats';
export const MESSAGES = 'messages';
export const USERS = 'users';
export const POSTS = 'posts';
export const APPRAISAL = 'appraisal';
export const LIKES = 'likes';
export const SHITS = 'shits';

export const DEFAULT_AVATAR_URL =
	'https://www.pinclipart.com/picdir/big/133-1331433_free-user-avatar-icons-happy-flat-design-png.png';
export const LOGO =
	'https://firebasestorage.googleapis.com/v0/b/ush-app.appspot.com/o/48_2.png?alt=media&token=139b0a20-58f8-45c8-90df-4df73627e698';
export const POST_DOWNLOAD_IMG =
	'https://firebasestorage.googleapis.com/v0/b/ush-app.appspot.com/o/upload_img%20(1).jpg?alt=media&token=cc38b8af-b190-4af9-9235-f487f8d65f60';
export interface Message {
	content?: string;
	id: string | number;
	chatId: string;
	createdAt: string | Date;
	image?: string | null;
	member: Member;
}
interface updatePublicMessageAction {
	type: typeof FETCH_PUBLIC_MESSAGE;
	payload: any;
}

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
	membersToken: Array<string>;
	membersName: Array<string>;
	membersPhotoUrl: Array<string>;
	membersId: Array<string>;
}

export interface Chats {
	publicChats: Array<PublicChat>;
	privateChats: Array<PrivateChat>;
	publicMessages: Array<Message>;
	privateMessages: Array<Message>;
	isPrivateChatsLoaded: boolean;
	isPublicChatsLoaded: boolean;
}

interface fetchChatsAction {
	type: typeof FETCH_PUBLIC_CHATS;
	payload: Array<PublicChat>;
}

interface fetchPrivateChats {
	type: typeof FETCH_PRIVATE_CHATS;
	payload: Array<PrivateChat>;
}

export type chatsAction =
	| fetchChatsAction
	| fetchPrivateChats
	| updatePublicMessageAction;

export type Member =
	| {
			name: string | null | undefined;
			id: string | undefined | number;
			email: string | null | undefined;
			photoUrl?: string | null | undefined;
			about?: string | undefined | null;
			pushToken?: string | undefined;
	  }
	| firebase.firestore.DocumentData
	| undefined;

export interface MembersState {
	members: Array<Member>;
	member: Member;
}

interface signOutAction {
	type: typeof SIGN_OUT;
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
	| fetchMembersAction
	| signOutAction;

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

export type Post =
	| {
			title: string;
			description?: string;
			createAt: string | number;
			imageUrl: string;
			imageHeight: number;
			imageWidth: number;
			postId: string;
			likes: number;
			shits: number;
			author: Member;
	  }
	| firebase.firestore.DocumentData
	| undefined;
export interface PostsState {
	post: Post;
	posts: Array<Post>;
	isLoaded: boolean;
}

interface fetchPosts {
	type: typeof FETCH_POSTS;
	payload: Array<Post>;
}
interface createPost {
	type: typeof CREATE_POST;
	payload: Post;
}

interface addLike {
	type: typeof ADD_LIKE;
}

interface removeLike {
	type: typeof REMOVE_LIKE;
}

interface getLike {
	type: typeof GET_LIKE;
	payload: number;
}

interface addShit {
	type: typeof ADD_SHIT;
}

interface removeShit {
	type: typeof REMOVE_SHIT;
}

interface getShit {
	type: typeof GET_SHIT;
	payload: number;
}

export type PostsActions =
	| createPost
	| fetchPosts
	| addLike
	| getLike
	| removeLike
	| addShit
	| removeShit
	| getShit;
