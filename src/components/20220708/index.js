import { useState, useEffect } from "react";
import { ToDoList } from "./ToDoList.js";

function App() {
  const [inputText, setText] = useState('');
  const [list, setList] = useState([]);
  const changeText = (e) => {
    setText(e.target.value);
  };
  const appendList = () => {
    if (inputText === '') {
      alert('텅빈거 넣지 마라....');
      return;
    }
    setList(list.concat({ name: inputText, isComplete: false }));
    setText('');
  };
  const deleteTodo = (index) => {
    const arr = [...list];
    arr.splice(index, 1)
    setList(arr);
  }
  const clickTodo = (index) => {
    const arr = [...list];
    arr[index].isComplete = !arr[index].isComplete;
    setList(arr);
  }
  const StatusBlock = () => {
    let text;
    if (list.length === 0) {
      text = '등록된 할일이 없습니다 :)';
    } else if (list.some((v) => !v.isComplete)) {
      const remainingTask = list.filter((v) => !v.isComplete);
      text = `오늘 할일이 ${ remainingTask.length }개 남았습니다. ${ remainingTask.map(() => '&#128170;').join('') }`;
    } else {
      text = '오늘 해야할 일을 모두 했습니다. &#128079;&#128079;&#128079;';
    }
    return (
      <h2 style={{ marginTop: '40px', lineHeight: '30px' }} dangerouslySetInnerHTML={{ __html: text }}></h2>
    );
  }
  const [initFlag, setInitFlag] = useState(false);
  useEffect(() => {
    if (!initFlag) {
      const item = localStorage.getItem('to-do-list');
      setList(item ? JSON.parse(item) : []);
      setInitFlag(true);
    } else {
      localStorage.setItem('to-do-list', JSON.stringify(list));
    }
  }, [JSON.stringify(list)]);
  return (
    <div>
      <h1>To....Do......L...I....S......T.....</h1>
      <ToDoList list={list} deleteTodo={deleteTodo} clickTodo={clickTodo}></ToDoList>
      <div style={{ marginTop: '20px' }}>
        <input value={inputText} onKeyUp={evt => evt.key === 'Enter' ? appendList() : ''} onChange={changeText} />
        <button style={{ padding: '4px 8px', backgroundColor: 'coral', color: '#FFF', borderRadius: '8px', border: 'none', marginLeft: '10px' }} onClick={appendList}>추가하기이이이이이</button>
      </div>
      <div>
        <StatusBlock/>
      </div>
    </div>
  );
}

export default App;
