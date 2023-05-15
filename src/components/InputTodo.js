import { FaPlusCircle, FaSpinner, FaSearch } from "react-icons/fa";
import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "./style/InputTodo.module.css";

import useFocus from "../hooks/useFocus";
import Suggestion from "./Suggestion";
import { getSuggestion } from "../api/suggestion";
import useInput from "../hooks/useInput";

const InputTodo = ({ setTodos }) => {
  const [suggestionList, setSuggestionList] = useState([]);
  const { ref, setFocus } = useFocus();
  const { inputText, setInputText, isLoading, handleSubmit } = useInput(setTodos);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleChange = useCallback(
    async e => {
      setInputText(e.target.value);
      if (e.target.value.trim() !== "") {
        const res = await getSuggestion(e.target.value);
        setSuggestionList(res.data);
      }
    },
    [setInputText]
  );

  return (
    <Fragment>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <FaSearch className={styles.btn_search} />
        <input
          className={styles.input_text}
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={handleChange}
          disabled={isLoading}
        />
        {!isLoading ? (
          <button className={styles.input_submit} type="submit">
            <FaPlusCircle className={styles.btn_plus} />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </form>
      {suggestionList.length !== 0 ? (
        <Suggestion list={suggestionList} setInputText={setInputText} handleSubmit={handleSubmit} />
      ) : null}
    </Fragment>
  );
};

export default InputTodo;
