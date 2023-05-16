import { FaSpinner, FaEllipsisH } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
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

  useEffect(() => {
    setListData(list.result || []);
  }, [list]);

  const callback = () => {
    if (endRef.current) return;
    setPage(prev => prev + 1);
  };

  const getList = () => {
    setLoad(true);
    setTimeout(async () => {
      const res = await getSuggestion(list.q, page, undefined);
      if (res.data.page > res.data.total / res.data.limit) {
        endRef.current = true;
      } else {
        const newList: string[] = [...listData, ...res.data.result];
        console.info(res.data.total);
        if (newList.length <= res.data.total) setListData(newList);
      }
      setLoad(false);
    }, DELAY);
  };

  useEffect(() => {
    getList();
  }, [page, getList]);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 1, root: rootRef.current });
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

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
      ) : null}
      {listData.length !== 0 && !endRef.current && !load ? (
        <div ref={target}>
          <FaEllipsisH className="ellipsisH" />
        </div>
      ) : null}
    </div>
  );
};

export default Suggestion;
