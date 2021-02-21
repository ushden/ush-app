import { messagesReducer } from './chats/messagesReducer';
import { chatsReducer } from './chats/chatsReducer';
import { alertReducer } from './alert/alertReducer';
import { membersReducer } from './members/membersReducer';
import { loadingReducer } from './loading/loadingReducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	members: membersReducer,
	loading: loadingReducer,
	alert: alertReducer,
	chats: chatsReducer,
	messages: messagesReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
