import { FaPlusCircle, FaSpinner, FaSearch } from "react-icons/fa";
import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "./style/InputTodo.module.css";

import { createTodo } from "../api/todo";
import useFocus from "../hooks/useFocus";
import Suggestion from "./Suggestion";
import { getSuggestion } from "../api/suggestion";

const InputTodo = ({ setTodos }) => {
  const [inputText, setInputText] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async e => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert("Please write something");
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos(prev => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
        setIsLoading(false);
      }
    },
    [inputText, setTodos]
  );

  const handleChange = useCallback(async e => {
    setInputText(e.target.value);
    if (e.target.value.trim() !== "") {
      const res = await getSuggestion(e.target.value);
      setSuggestionList(res.data);
    }
  }, []);

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
      {suggestionList.length !== 0 ? <Suggestion list={suggestionList} /> : null}
    </Fragment>
  );
};

export default InputTodo;
