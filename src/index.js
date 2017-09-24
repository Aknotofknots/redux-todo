import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //Provider Component
import App from './components/App'; //Import our App
import store from './store';


/**
 * Provider is in charge of turning our `store` into 
 * `this.props.store` for every component in our application
 * This makes it so we can access the store at any time in any component
 * via the `connect` component
 */
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider> 
    , document.getElementById('root')
);

