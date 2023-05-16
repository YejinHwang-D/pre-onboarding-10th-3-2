import { FaSpinner, FaEllipsisH } from "react-icons/fa";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./style/Suggestion.module.css";
import SuggestionItem from "./SuggestionItem";
import { getSuggestion } from "../api/suggestion";
import { DELAY } from "../constant/constant";

const Suggestion = ({ list, setInputText, handleSubmit }: any) => {
  const [listData, setListData] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const target = useRef(null);
  const [load, setLoad] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const endRef = useRef(false);
  const preventRef = useRef(true);

  useEffect(() => {
    setListData(list.result || []);
  }, [list]);

  const callback = (entries: any) => {
    const temp = entries[0];
    if (!endRef.current && temp.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 1, root: rootRef.current });
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [callback]);

  const getList = useCallback(() => {
    setTimeout(async () => {
      setLoad(true);
      try {
        const res = await getSuggestion(list.q, page, undefined);
        console.info(res.data.page, page);
        if (res.data.page > res.data.total / res.data.limit) {
          endRef.current = true;
        } else {
          const newList: string[] = [...listData, ...res.data.result];
          preventRef.current = true;
          if (newList.length <= res.data.total) setListData(newList);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoad(false);
      }
    }, DELAY);
  }, [listData, page, list]);

  useEffect(() => {
    if (!preventRef.current) getList();
  }, [page, getList]);

  return (
    <div className={styles.container} ref={rootRef}>
      {listData.length === 0 ? (
        <div>추천 검색어가 없습니다.</div>
      ) : (
        listData.map((element: any, index: number) => (
          <SuggestionItem
            key={index}
            q={list.q}
            item={element}
            setInputText={setInputText}
            handleSubmit={handleSubmit}
          />
        ))
      )}
      {load ? (
        <div className="spinner_container">
          <FaSpinner className="spinner" />
        </div>
      ) : listData.length !== 0 && !endRef.current ? (
        <div ref={target}>
          <FaEllipsisH className="ellipsisH" />
        </div>
      ) : null}
    </div>
  );
};

export default Suggestion;
