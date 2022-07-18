import { useState, useMemo, useContext } from 'react';
import { MyContext } from '../../features/auth/AuthContext';
import Timer from './Timer';

const Signup = ({ dispatch }) => {
  const { setLogin } = useContext(MyContext);
  const [inputState, setInputState] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
  });

  const [isHuman, setIsHuman] = useState(false);

  const objValid = {
    empty: useMemo(() => !Object.values(inputState).some((v) => !v), [inputState]),
    matchPassword: useMemo(() => (inputState.password && inputState.confirmPassword && ( inputState.password === inputState.confirmPassword )), [inputState.password, inputState.confirmPassword]),
    email: useMemo(() => /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(inputState.email), [inputState.email]),
    phone: useMemo(() => /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(inputState.phone), [inputState.phone]),
    isHuman,
  };

  const changeInput = ( key, evt ) => {
    setInputState({ ...inputState, ...{ [key]: evt.currentTarget.value } });
  }

  const signup = () => {
    if (Object.values(objValid).some((v) => !v)) {
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

  const setTimerValid = (flag) => {
    setIsHuman(flag);
  };

  const validStyle = {
    textDecoration: 'line-through',
  };
  return (
    <div style={{ width: '500px', margin: '0 auto', border: '1px solid #eee', padding: '20px' }}>
      <h1>회원가입</h1>
      <ul>
        <li style={{ marginBottom: '10px' }}>아이디: <input value={ inputState.id } onChange={ evt => changeInput('id', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>비밀번호: <input value={ inputState.password } onChange={ evt => changeInput('password', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>비밀번호 확인: <input value={ inputState.confirmPassword } onChange={ evt => changeInput('confirmPassword', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>이메일: <input value={ inputState.email } onChange={ evt => changeInput('email', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>핸드폰번호: <input value={ inputState.phone } onChange={ evt => changeInput('phone', evt) } /></li>
      </ul>
      { objValid.isHuman ? '휴먼!' : <Timer setTimerValid={ setTimerValid } />  }
      <div style={{ padding: '10px', marginTop: '20px', border: '1px solid #eee' }}>
        <div style={ objValid.empty ? validStyle : {} }>빈값이 없는지</div>
        <div style={ objValid.matchPassword ? validStyle : {} }>비밀번호가 일치한다</div>
        <div style={ objValid.email ? validStyle : {} }>이메일이 정확한지</div>
        <div style={ objValid.phone ? validStyle : {} }>핸드폰번호가 정확한지</div>
        <div style={ objValid.isHuman ? validStyle : {} }>'컴퓨터카 아니십니까?' 통과하기</div>
      </div>
      <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => dispatch({ type: 'login' })}>로그인하러가기</div>
      <div><button style={{ width: '100%', background: 'coral', color: 'white', borderRadius: '20px', border: 0, padding: '10px 0', marginTop: '10px' }} onClick={() => signup()}>회원가입</button></div>
    </div>
  );
};

export default Signup;
