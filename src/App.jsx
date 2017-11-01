import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { initialState } from './testData';
import Gitusers from './scenes/Gitusers';


let store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, logger)));

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={Gitusers} />
    </Router>
  </Provider>
);

export default App;
