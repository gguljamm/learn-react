import { useEffect, useRef, useState } from 'react';

const Signup = ({ setLogin, dispatch }) => {
  const [inputState, setInputState] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
  });

  const refInput = useRef();
  refInput.current = inputState;

  const [validNumberState, setValidNumberState] = useState({
    isShowCheck: false,
    validNumber: '',
    validCheckNumber: '',
  })

  const validTimeoutRef = useRef();
  const [validCount, setValidCount] = useState(0);
  const validCountRef = useRef();
  validCountRef.current = validCount;

  const [valid, setValid] = useState({
    empty: false,
    matchPassword: false,
    email: false,
    phone: false,
    isHuman: false,
  });

  useEffect(() => {
    setValid({
      ...valid,
      empty: !Object.values(inputState).some((v) => !v),
      matchPassword: (inputState.password && inputState.confirmPassword && ( inputState.password === inputState.confirmPassword )),
      email: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(inputState.email),
      phone: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(inputState.phone),
    })
  }, [inputState.id, inputState.password, inputState.confirmPassword, inputState.email, inputState.phone]);

  useEffect(() => {
    return () => {
      if (validTimeoutRef.current) {
        clearInterval(validTimeoutRef.current);
      }
    };
  }, []);

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

  const setCheck = (flag) => {
    const random = Math.floor(Math.random() * 10000);
    if (flag) {
      setValidCount(180);
      validTimeoutRef.current = setInterval(() => {
        if (validCountRef.current > 0) {
          setValidCount(validCountRef.current - 1);
        } else {
          clearInterval(validTimeoutRef.current);
          setValidNumberState({
            isShowCheck: false,
            validNumber: '',
            validCheckNumber: '',
          });
        }
      }, 1000);
      setValidNumberState({
        isShowCheck: true,
        validNumber: `${ random }`,
        validCheckNumber: '',
      })
    } else {
      setValidNumberState({
        isShowCheck: false,
        validNumber: '',
        validCheckNumber: '',
      })
    }
  }

  const changeValidNumber = (evt) => {
    setValidNumberState({ ...validNumberState, validCheckNumber: evt.currentTarget.value });
    setValid({
      ...valid,
      isHuman: validNumberState.validNumber === evt.currentTarget.value,
    });
    if (validNumberState.validNumber === evt.currentTarget.value) {
      setValidNumberState({
        isShowCheck: false,
      })
    }
  };

  const validStyle = {
    textDecoration: 'line-through',
  };
  return (
    <div style={{ width: '500px', margin: '0 auto', border: '1px solid #eee', padding: '20px' }}>
      <h1>회원가입</h1>
      <ul>
        <li style={{ marginBottom: '10px' }}>아이디: <input value={ refInput.current.id } onChange={ evt => changeInput('id', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>비밀번호: <input value={ refInput.current.password } onChange={ evt => changeInput('password', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>비밀번호 확인: <input value={ refInput.current.confirmPassword } onChange={ evt => changeInput('confirmPassword', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>이메일: <input value={ refInput.current.email } onChange={ evt => changeInput('email', evt) } /></li>
        <li style={{ marginBottom: '10px' }}>핸드폰번호: <input value={ refInput.current.phone } onChange={ evt => changeInput('phone', evt) } /></li>
      </ul>
      <div>
        {
          validNumberState.isShowCheck
            ? <div>[{ validNumberState.validNumber }] 입력해주세요 <input value={ validNumberState.validCheckNumber } onChange={ evt => changeValidNumber(evt) } /> ({ validCountRef.current }초 남음!!)</div>
            : (valid.isHuman ? '' : <button onClick={ () => setCheck(true) }>컴퓨터가 아니십니까?</button>)
        }
      </div>
      <div style={{ padding: '10px', marginTop: '20px', border: '1px solid #eee' }}>
        <div style={ valid.empty ? validStyle : {} }>빈값이 없는지</div>
        <div style={ valid.matchPassword ? validStyle : {} }>비밀번호가 일치한다</div>
        <div style={ valid.email ? validStyle : {} }>이메일이 정확한지</div>
        <div style={ valid.phone ? validStyle : {} }>핸드폰번호가 정확한지</div>
        <div style={ valid.isHuman ? validStyle : {} }>'컴퓨터카 아니십니까?' 통과하기</div>
      </div>
      <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => dispatch({ type: 'login' })}>로그인하러가기</div>
      <div><button style={{ width: '100%', background: 'coral', color: 'white', borderRadius: '20px', border: 0, padding: '10px 0', marginTop: '10px' }} onClick={() => signup()}>회원가입</button></div>
    </div>
  );
};

export default Signup;
