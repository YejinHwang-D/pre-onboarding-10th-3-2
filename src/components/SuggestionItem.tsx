import styles from "./style/SuggestionItem.module.css";

const SuggestionItem = ({ item }: any) => {
  console.info("item= ", item);
  return <div className={styles.item_container}>{item}</div>;
};

export default SuggestionItem;
