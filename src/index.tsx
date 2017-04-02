import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rolloutDashboard from './reducers'
import App from './components/App'

let store = createStore(
  rolloutDashboard, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware)
  );

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)