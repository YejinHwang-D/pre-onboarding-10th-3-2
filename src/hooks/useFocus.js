import { useRef } from "react";

const useFocus = () => {
  const ref = useRef();
  const setFocus = () => {
    ref.current && ref.current.focus();
  };
  const setBlur = () => {
    ref.current && ref.current.blur();
  };

  return { ref, setFocus, setBlur };
};

export default useFocus;
