import { useState, useEffect } from "react";

function ToDo({ name, isComplete, index, clickTodo, deleteTodo }) {
  const objStyleList = {
    padding: '0 20px',
    lineHeight: '50px',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF',
    transition: 'transform .3s ease',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  };
  const objStyleFlipped = {
    transform: 'rotateX(180deg)',
  };
  const objStyleComplete = {
    textDecoration: 'line-through'
  };
  const [isHovered, changeHover] = useState(false);
  return (
    <li style={{ position: 'relative', height: '50px', width: '100%', listStyle: 'none'}} onMouseEnter={() => changeHover(true)} onMouseLeave={() => changeHover(false)}>
      <div style={{ ...objStyleList, ...(isHovered ? objStyleFlipped : {}), ...(isComplete ? objStyleComplete : {}) }}>{ name }</div>
      <div style={{ ...objStyleList, ...(!isHovered ? objStyleFlipped : {}), background: 'lightgray' }}>
        <button onClick={() => clickTodo(index)}>{ isComplete ? '안했다...' : '했다!!!' }</button>
        <button onClick={() => deleteTodo(index)}>삭제하기</button>
      </div>
    </li>
  );
}

function ToDoList({ list, deleteTodo, clickTodo }) {
  return (
    <ul style={{ margin: 0, padding: 0 }}>
      { list.map((v, index) => <ToDo name={v.name} isComplete={v.isComplete} index={index} key={index} deleteTodo={deleteTodo} clickTodo={clickTodo}></ToDo>) }
    </ul>
  )
}

function App() {
  const [inputText, setText] = useState('');
  const [list, setList] = useState(() => ([
    { name: '아침 맛있게 먹기', isComplete: false, },
    { name: '점심 더 맛있게 먹기', isComplete: false, },
    { name: '간식도 먹기', isComplete: false, },
    { name: '저녁을 제일 맛있게 먹기', isComplete: false, },
    { name: '야식도 먹을까 고민해보기', isComplete: false, },
    { name: '잠들기 전에 내일 뭐먹을지 생각하기', isComplete: false, },
  ]));
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

  useEffect(() => {
    console.log(inputText);
  });
  return (
    <div>
      <h1>To....Do......L...I....S......T.....</h1>
      <ToDoList list={list} deleteTodo={deleteTodo} clickTodo={clickTodo}></ToDoList>
      <div style={{ marginTop: '20px' }}>
        <input value={inputText} onChange={changeText} />
        <button style={{ padding: '4px 8px', backgroundColor: 'coral', color: '#FFF', borderRadius: '8px', border: 'none', marginLeft: '10px' }} onClick={appendList}>추가하기이이이이이</button>
      </div>
      <div>
        <StatusBlock/>
      </div>
    </div>
  );
}

export default App;
