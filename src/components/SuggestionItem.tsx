import { TEXT_LENGTH } from "../constant/constant";
import styles from "./style/SuggestionItem.module.css";

const SuggestionItem = ({ item, setInputText, handleSubmit, q }: any) => {
  const text = item.length > TEXT_LENGTH ? item.slice(0, TEXT_LENGTH) + "..." : item;

  const handleClick = (e: any) => {
    setInputText("");
    handleSubmit(e);
  };
  const regex = new RegExp(`${q}`, "gi");
  const chunks = text.split(regex);

  const text2 = chunks.map((ele: string, index: number) => {
    if (index >= chunks.length - 1) {
      return (
        <span className={styles.text} key={index}>
          {ele}
        </span>
      );
    } else {
      return (
        <span className={styles.text} key={index}>
          {ele}
          <span className={styles.bold_text} key={index}>
            {q}
          </span>
        </span>
      );
    }
  });

  return (
    <div className={styles.item_container} onClick={handleClick}>
      {text2}
    </div>
  );
};

export default SuggestionItem;
