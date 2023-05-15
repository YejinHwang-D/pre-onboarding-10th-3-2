import { TEXT_LENGTH } from "../constant/constant";
import styles from "./style/SuggestionItem.module.css";

const SuggestionItem = ({ item }: any) => {
  console.info("item= ", item); //45글자 이상
  return (
    <div className={styles.item_container}>
      {item.length > 45 ? item.slice(0, TEXT_LENGTH) + "..." : item}
    </div>
  );
};

export default SuggestionItem;
