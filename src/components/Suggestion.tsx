import { useEffect, useState } from "react";
import styles from "./style/Suggestion.module.css";
import SuggestionItem from "./SuggestionItem";

const Suggestion = ({ list }: any) => {
  const [listData, setListData] = useState([]);
  console.info(list);

  useEffect(() => {
    setListData(list.result || []);
  }, [list]);

  return (
    <div className={styles.container}>
      {listData.length === 0 ? (
        <div>추천 검색어가 없습니다.</div>
      ) : (
        listData.map((element: any, index: number) => <SuggestionItem key={index} item={element} />)
      )}
    </div>
  );
};

export default Suggestion;
