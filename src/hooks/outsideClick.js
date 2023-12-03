"use client"
import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
    const ref = useRef();
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
  
    useEffect(() => {
      if (typeof document !== 'undefined') {
        document.addEventListener("click", handleClick);
    }
      return () => {
        if (typeof document !== 'undefined') {
          document.removeEventListener("click", handleClick);
      }
      };
    },[]);
    return ref;
  };
  export default useOutsideClick;