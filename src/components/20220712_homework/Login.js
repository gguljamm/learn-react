import { useState, useRef, useReducer, useEffect } from 'react';

const Login = ({ setLogin, dispatch }) => {
  const inputId = useRef(null);
  const inputPassword = useRef(null);

  const login = () => {
    const arrUser = JSON.parse(localStorage.getItem('user-list')) || [];
    const id = inputId.current.value;
    const password = inputPassword.current.value;
    const info = arrUser.find((v) => v.id === id);
    if (info) {
      if (password === info.password) {
        setLogin(info);
      } else {
        alert('비밀번호가 틀렸습니다.');
      }
    } else {
      alert('일치하는 ID가 없습니다.');
    }
  };
  return (
    <div style={{ width: '500px', margin: '0 auto', border: '1px solid #eee', padding: '20px' }}>
      <h1>로그인</h1>
      <ul>
        <li style={{ marginBottom: '10px' }}>아이디: <input ref={ inputId } /></li>
        <li style={{ marginBottom: '10px' }}>비밀번호: <input ref={ inputPassword } /></li>
      </ul>
      <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => dispatch({ type: 'signup' })}>회원가입하러가기</div>
      <div><button style={{ width: '100%', background: 'coral', color: 'white', borderRadius: '20px', border: 0, padding: '10px 0', marginTop: '10px' }} onClick={() => login()}>로그인</button></div>
    </div>
  );
}

const Signup = ({ setLogin, dispatch }) => {
  const [inputState, setInputState] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
  });

  const [valid, setValid] = useState({
    empty: false,
    matchPassword: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    setValid({
      empty: !Object.values(inputState).some((v) => !v),
      matchPassword: (inputState.password && inputState.confirmPassword && ( inputState.password === inputState.confirmPassword )),
      email: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(inputState.email),
      phone: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(inputState.phone),
    })
  }, [inputState.id, inputState.password, inputState.confirmPassword, inputState.email, inputState.phone]);

  const refInput = useRef();
  refInput.current = inputState;

  const changeInput = ( key, evt ) => {
    setInputState({ ...inputState, ...{ [key]: evt.currentTarget.value } });
  }

  const signup = () => {
    if (Object.values(valid).some((v) => !v)) {
      alert('입력값 확인!');
      return;
    }
    const userList = JSON.parse(localStorage.getItem('user-list')) || [];
    if (userList.some((v) => v.id === inputState.id)) {
      alert('동일한 아이디가 있습니다');
    } else {
      localStorage.setItem('user-list', JSON.stringify([inputState, ...userList]));
      setLogin(inputState);
    }
  };
  const validStyle = {
    textDecoration: 'line-through',
  };
  return (
    <div style={{ width: '500px', margin: '0 auto', border: '1px solid #eee', padding: '20px' }}>
      <h1>회원가입</h1>
      <ul>
        <li style={{ marginBottom: '10px' }}>아이디: <input value={ refInput.id } onChange={ evt => changeInput('id', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>비밀번호: <input value={ refInput.password } onChange={ evt => changeInput('password', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>비밀번호 확인: <input value={ refInput.confirmPassword } onChange={ evt => changeInput('confirmPassword', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>이메일: <input value={ refInput.email } onChange={ evt => changeInput('email', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>핸드폰번호: <input value={ refInput.phone } onChange={ evt => changeInput('phone', evt) } /></li>
      </ul>
      <div style={{ padding: '10px', border: '1px solid #eee' }}>
        <div style={ valid.empty ? validStyle : {} }>빈값이 없는지</div>
        <div style={ valid.matchPassword ? validStyle : {} }>비밀번호가 일치한다</div>
        <div style={ valid.email ? validStyle : {} }>이메일이 정확한지</div>
        <div style={ valid.phone ? validStyle : {} }>핸드폰번호가 정확한지</div>
      </div>
      <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => dispatch({ type: 'login' })}>로그인하러가기</div>
      <div><button style={{ width: '100%', background: 'coral', color: 'white', borderRadius: '20px', border: 0, padding: '10px 0', marginTop: '10px' }} onClick={() => signup()}>회원가입</button></div>
    </div>
  );
};

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
