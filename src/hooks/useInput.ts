import { useState, useCallback } from "react";
import { createTodo } from "../api/todo";

const useInput = (setTodos: any) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: any) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        let trimmed = inputText.trim();
        if (e.target.textContent) {
          trimmed = e.target.textContent;
        }

        if (!trimmed) {
          return alert("Please write something");
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev: any) => [...prev, data]);
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

  return { inputText, setInputText, isLoading, handleSubmit };
};

export default useInput;
