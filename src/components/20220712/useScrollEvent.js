import { useEffect } from 'react';

function useScrollEvent() {
  useEffect(() => {
    const event = () => {
      console.log(window.scrollY);
    };
    document.addEventListener('scroll', event);
    return () => {
      document.removeEventListener('scroll', event)
    };
  })
}

export default useScrollEvent;
