import { useEffect, useState } from "react";
import styles from "./style/Suggestion.module.css";
import SuggestionItem from "./SuggestionItem";

const Suggestion = ({ list, setInputText, handleSubmit }: any) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(list.result || []);
  }, [list]);
  console.info(list);

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Suggestion;
