import {useEffect, useRef} from 'react';
import useTodo from './useTodo.js';
import useScrollEvent from './useScrollEvent.js';

/*
useRef => 비제어 컴포넌트 (얘는 바꿔도 리랜더가 일어나지 않음!)

숙제로 나올 것들
* useImperativeHandle
* forwardRef

* custom hook =>
  무조건 prefix로 use가 들어가야하고 pascalCase로 써야함
  useApiCall, useToast, useModal

* useReducer =>
  과제 나갈 때 이거 한번 써볼것

  todoList 만든거 과제 mr 해주셈요
  create react app으로 프로젝트를 만들고

 */

function App() {
  const inputEl = useRef(null); // .current == vue3 ref value
  const { todo, setTodo, clearTodo } = useTodo('초기값');
  useScrollEvent();

  useEffect(() => {
    console.log(inputEl.current);
  }, [])

  const submit = () => {
    console.log(inputEl.current.value);
    console.log(todo);
  };

  return (
    <div style={{ height: '100000px' }}>
      { /* 비제어 컴포넌트 */ }
      <div>
        <div>비제어 컴포넌트 input</div>
        <input ref={inputEl}/>
      </div>
      { /* 커스텀 훅 */ }
      <div>
        <div>커스텀 훅 사용한 input</div>
        <input value={todo} onChange={setTodo} />
        <br/>
      </div>
      <button onClick={ submit }>각각 값 호출</button>
      <button onClick={ clearTodo }>clear</button>
    </div>
  )
}

export default App;
