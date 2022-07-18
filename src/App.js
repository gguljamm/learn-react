import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Comp20220701 from './components/20220701/index.js';
import Comp20220708 from './components/20220708/index.js';
import Comp20220712 from './components/20220712/index.js';
import Comp20220712_2 from './components/20220712/TodoWrapper.js';
import Comp20220712_3 from './components/20220712_homework/index.js';
import LoginHome from './components/20220712_homework/LoginHome.js';
import AuthContext, { MyContext } from './features/auth/AuthContext';

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
    <header style={{ lineHeight: '50px' }}>
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

  return (
    <AuthContext>
      <Content></Content>
    </AuthContext>
  );
}

function Content() {
  const { isLogged } = useContext(MyContext);
  return (
    <div style={{ width: '500px', margin: '0 auto', border: '1px solid #eee', padding: '20px' }}>
      {
        !isLogged
        ? <LoginHome></LoginHome>
        : <BrowserRouter>
            <Header></Header>
            <Routes>
              <Route path='/' element={<div>하이용</div>}></Route>
              <Route path='/20220701' element={<Comp20220701/>}></Route>
              <Route path='/20220708' element={<Comp20220708/>}></Route>
              <Route path='/20220712' element={<Comp20220712/>}></Route>
              <Route path='/20220712_2' element={<Comp20220712_2/>}></Route>
              <Route path='/20220712_3' element={<Comp20220712_3/>}></Route>
              <Route path='*' element={<div>404 NOT FOUND</div>}></Route>
            </Routes>
          </BrowserRouter>
      }
    </div>
  )
}

export default App;
