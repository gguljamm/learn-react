import { useState } from "react";

function ToDoItem({ name, isComplete, index, clickTodo, deleteTodo }) {
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
      { list.map((v, index) => <ToDoItem name={v.name} isComplete={v.isComplete} index={index} key={index} deleteTodo={deleteTodo} clickTodo={clickTodo}></ToDoItem>) }
    </ul>
  )
}

export {
  ToDoList,
};
