// Custom Hook for close moodals capturing click Outside
import { useEffect, useRef } from "react";


export default function useOutsideClick(handlerClose, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if(ref.current && !ref.current.contains(e.target)) {
        console.log("Click Outside!")
        handlerClose();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      console.log("Handle Click Removed!")
      document.removeEventListener('click', handleClick, listenCapturing);
    }
  }, [handlerClose, listenCapturing]);

  return ref;
}

