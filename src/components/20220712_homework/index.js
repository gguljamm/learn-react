import { useContext } from 'react';
import { AuthContent } from '../../features/auth/AuthProvider';

function App() {
  const { authData, setLogin } = useContext(AuthContent);
  return (
    <div>
      <h1>내 정보</h1>
      <ul>
        <li style={{ marginBottom: '10px' }}>아이디: { authData.current.id }</li>
        <li style={{ marginBottom: '10px' }}>이메일: { authData.current.email }</li>
        <li style={{ marginBottom: '10px' }}>핸드폰 번호: { authData.current.phone }</li>
      </ul>
      <div><button onClick={ () => setLogin(null) }>로그아웃</button></div>
    </div>
  );
}

export default App;
