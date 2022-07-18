import { useEffect, useRef, useState, createContext } from 'react';

export const MyContext = createContext(null);

function AuthProvider({ children }) {
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
  return <MyContext.Provider value={{ isLogged, setLogin, authData }}>{ children }</MyContext.Provider>
}

export default AuthProvider;
