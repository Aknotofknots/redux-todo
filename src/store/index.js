import {
    createStore,
    combineReducers
} from 'redux'; //Create store
import todos from '../reducers/todos';
import user from '../reducers/user';


const rootReducer = combineReducers({ 
    todos,
    user
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);

export default store;