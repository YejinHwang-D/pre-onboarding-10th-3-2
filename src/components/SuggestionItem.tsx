import { TEXT_LENGTH } from "../constant/constant";
import styles from "./style/SuggestionItem.module.css";

const SuggestionItem = ({ item, setInputText, handleSubmit }: any) => {
  const text = item.length > TEXT_LENGTH ? item.slice(0, TEXT_LENGTH) + "..." : item;

  const handleClick = (e: any) => {
    alert(e.target.textContent);
    setInputText("");
    handleSubmit(e);
  };

  return (
    <div className={styles.item_container} onClick={handleClick}>
      {text}
    </div>
  );
};

export default SuggestionItem;
