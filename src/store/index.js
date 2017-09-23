import { 
    createStore, 
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import todos from '../reducers/todos';
import user from '../reducers/user';
import movies from '../reducers/movies';
import error from '../reducers/errors';

const rootReducer = combineReducers({   
    todos,
    user,
    movies,
    error
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

export default store;