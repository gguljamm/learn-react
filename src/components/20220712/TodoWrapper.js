import { useState, useEffect, useRef } from "react";
import { ToDoList } from "./ToDoList.js";

function App() {
  const [list, setList] = useState([]);
  const inputEl = useRef();
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    if (!inputEl.current.value) {
      inputEl.current.focus()
    }
  }, [])

  const editList = () => {
    if (inputEl.current.value === '') {
      alert('텅빈거 넣지 마라....');
      return;
    }
    if (editIndex < 0) {
      setList(list.concat({ name: inputEl.current.value, isComplete: false }));
    } else {
      const arr = [...list];
      arr[editIndex].name = inputEl.current.value;
      setList(arr);
      setEditIndex(-1);
    }
    inputEl.current.value = '';
  };
  const deleteTodo = (index) => {
    const arr = [...list];
    arr.splice(index, 1)
    setList(arr);
    if (editIndex >= 0) {
      editTodo(-1);
    }
  }
  const editTodo = (index) => {
    if (index >= 0) {
      inputEl.current.value = list[index].name;
    } else {
      inputEl.current.value = '';
    }
    setEditIndex(index);
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
      <h1>To Do List</h1>
      <ToDoList list={list} deleteTodo={deleteTodo} clickTodo={clickTodo} editTodo={editTodo}></ToDoList>
      {

        <div style={{ marginTop: '20px' }}>
          <input ref={inputEl} onKeyUp={evt => evt.key === 'Enter' ? editList : ''} />
          <button style={{ padding: '4px 8px', backgroundColor: 'coral', color: '#FFF', borderRadius: '8px', border: 'none', marginLeft: '10px' }} onClick={ editList }>
            { editIndex >= 0 ? '수정하기' : '추가하기' }
          </button>
          { editIndex >= 0 ?
            <button style={{ padding: '4px 8px', backgroundColor: 'coral', color: '#FFF', borderRadius: '8px', border: 'none', marginLeft: '10px' }} onClick={() => editTodo(-1)}>취소</button>
            : null
          }
        </div>
      }
      <div>
        <StatusBlock/>
      </div>
    </div>
  );
}

export default App;
