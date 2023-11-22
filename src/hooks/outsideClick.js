import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
    const ref = useRef();
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
    return ref;
  };
  export default useOutsideClick;