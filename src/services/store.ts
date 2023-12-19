import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../utils/middleware';
import { wsOrdersUrl, wsAllOrdersUrl } from '../utils/api';
import { wsActions } from './actions/socket';
import { userWsActions } from './actions/user-socket';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsAllOrdersUrl, wsActions), socketMiddleware(wsOrdersUrl, userWsActions)));

export const store = createStore(rootReducer, enhancer);
