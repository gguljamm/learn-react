import { useEffect, useRef, useState } from 'react';

const Timer = ({ setTimerValid }) => {
  const [validNumberState, setValidNumberState] = useState({
    isShowCheck: false,
    validNumber: '',
    validCheckNumber: '',
  })

  const validTimeoutRef = useRef();
  const [validCount, setValidCount] = useState(0);

  const validCountRef = useRef();
  validCountRef.current = validCount;

  useEffect(() => {
    return () => {
      if (validTimeoutRef.current) {
        clearInterval(validTimeoutRef.current);
      }
    };
  }, []);

  const setTimer = (flag) => {
    const random = Math.floor(Math.random() * 10000);
    if (flag) {
      setValidCount(180);
      validTimeoutRef.current = setInterval(() => {
        if (validCountRef.current > 0) {
          setValidCount(validCountRef.current - 1);
        } else {
          clearInterval(validTimeoutRef.current);
          setValidNumberState({
            isShowCheck: false,
            validNumber: '',
            validCheckNumber: '',
          });
        }
      }, 1000);
      setValidNumberState({
        isShowCheck: true,
        validNumber: `${ random }`,
        validCheckNumber: '',
      })
    } else {
      setValidNumberState({
        isShowCheck: false,
        validNumber: '',
        validCheckNumber: '',
      })
    }
  }

  const changeValidNumber = (evt) => {
    const isSuccess = validNumberState.validNumber === evt.currentTarget.value;
    setValidNumberState({ ...validNumberState, validCheckNumber: evt.currentTarget.value });
    if (isSuccess) {
      setTimerValid(isSuccess);
      setValidNumberState({
        isShowCheck: false,
      })
    }
  };

  return (
    validNumberState.isShowCheck
      ? <div>[{ validNumberState.validNumber }] 입력해주세요 <input value={ validNumberState.validCheckNumber } onChange={ evt => changeValidNumber(evt) } /> ({ validCountRef.current }초 남음!!)</div>
      : <button onClick={ () => setTimer(true) }>컴퓨터가 아니십니까?</button>
  )
}

export default Timer;
