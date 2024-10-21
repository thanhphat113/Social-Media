import { configureStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../Reducers';
import thunk from 'redux-thunk';

const store = configureStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
