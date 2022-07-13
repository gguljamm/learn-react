import { useState } from 'react';

function useTodo(initValue) {
  const [keyword, setKeyword] = useState(initValue);

  const onChange = evt => {
    const { value } = evt.target;
    setKeyword(value);
  };

  const clearTodo = () => {
    setKeyword('');
  }

  return {
    todo: keyword,
    setTodo: onChange,
    clearTodo,
  };
}

export default useTodo;

