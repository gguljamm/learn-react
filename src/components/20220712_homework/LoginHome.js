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

function App() {
  const [page, dispatch] = useReducer(reducer, 'login');
  return (
    <>
      { page === 'login' ? <Login dispatch={dispatch} /> : <Signup dispatch={dispatch} /> }
    </>
  );
}

export default App;
