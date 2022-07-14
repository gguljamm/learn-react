import { useEffect, useState, useRef, useReducer } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Comp20220701 from './components/20220701/index.js';
import Comp20220708 from './components/20220708/index.js';
import Comp20220712 from './components/20220712/index.js';
import Comp20220712_2 from './components/20220712/TodoWrapper.js';
import Comp20220712_3 from './components/20220712_homework/index.js';
import LoginHome from './components/20220712_homework/LoginHome.js';

function Header() {
  const location = useLocation();
  const linkStyle = {
    border: '1px solid #eee',
    marginRight: '8px',
    textDecoration: 'none',
    color: '#000',
    padding: '4px 8px',
  };
  const activeLinkStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };
  return (
    <header style={{ width: '542px', margin: '0 auto', lineHeight: '50px' }}>
      <Link style={{ ...linkStyle, ...(location.pathname === '/' ? activeLinkStyle : {}) }} to="/">랜딩</Link>
      <Link style={{ ...linkStyle, ...(location.pathname === '/20220701' ? activeLinkStyle : {}) }} to="/20220701">07.01</Link>
      <Link style={{ ...linkStyle, ...(location.pathname === '/20220708' ? activeLinkStyle : {}) }} to="/20220708">07.08</Link>
      <Link style={{ ...linkStyle, ...(location.pathname === '/20220712' ? activeLinkStyle : {}) }} to="/20220712">07.12</Link>
      <Link style={{ ...linkStyle, ...(location.pathname === '/20220712_2' ? activeLinkStyle : {}) }} to="/20220712_2">07.12 실습</Link>
      <Link style={{ ...linkStyle, ...(location.pathname === '/20220712_3' ? activeLinkStyle : {}) }} to="/20220712_3">07.12 숙제</Link>
    </header>
  )
}

function App() {
  const [isLogged, setLogged] = useState(false);
  const authData = useRef(null);
  useEffect(() => {
    const id = localStorage.getItem('test-auth');
    if (id) {
      const userList = JSON.parse(localStorage.getItem('user-list')) || [];
      const info = userList.find((v) => v.id === id);
      if (info) {
        authData.current = info;
        setLogged(true);
      }
    }
  }, []);
  const setLogin = (data) => {
    if (data) {
      localStorage.setItem('test-auth', data.id);
      authData.current = data;
      setLogged(true);
    } else {
      localStorage.removeItem('test-auth');
      authData.current = {};
      setLogged(false);
    }
  };
  return (
    !isLogged
      ? <LoginHome setLogin={ setLogin }></LoginHome>
      : <div>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<div style={{ width: '542px', margin: '0 auto' }}>하이용</div>}></Route>
            <Route path="/20220701" element={<Comp20220701 />}></Route>
            <Route path="/20220708" element={<Comp20220708 />}></Route>
            <Route path="/20220712" element={<Comp20220712 />}></Route>
            <Route path="/20220712_2" element={<Comp20220712_2 />}></Route>
            <Route path="/20220712_3" element={<Comp20220712_3 authData={ authData } setLogin={ setLogin } />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
