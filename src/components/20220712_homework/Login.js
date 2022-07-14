import { useRef } from 'react';

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

export default Login;
