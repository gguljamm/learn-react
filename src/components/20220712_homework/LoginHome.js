import { useReducer } from 'react';
import Signup from './Signup.js';
import Login from './Login.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return 'login';
    case 'signup':
      return 'signup';
    default:
      return state;
  }
};

function App({ setLogin }) {
  const [page, dispatch] = useReducer(reducer, 'login');
  return (
    <>
      { page === 'login' ? <Login setLogin={setLogin} dispatch={dispatch} /> : <Signup setLogin={setLogin} dispatch={dispatch} /> }
    </>
  );
}

export default App;
