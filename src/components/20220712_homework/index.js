function App({ authData, setLogin }) {
  return (
    <div style={{ width: '500px', margin: '0 auto', border: '1px solid #eee', padding: '20px' }}>
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
