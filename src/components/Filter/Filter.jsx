import styles from "./Filter.module.css";
import { toggleQualityOption } from "../../slice/filterSlice.js";
import { useDispatch } from "react-redux";

export default function Filter() {
  const dispatch = useDispatch();
  const handleForm = (name) => {
    dispatch(toggleQualityOption(name));
  };

  return (
    <>
      <form
        className={styles["form"]}
        onChange={(e) => handleForm(e.target.value)}
      >
        <label htmlFor="cheapest" className={styles["label-filter"]}>
          Самый дешевый
          <input
            type="radio"
            id="cheapest"
            name="filter"
            value="cheapest"
            defaultChecked={true}
            className={styles["input-filter"]}
          />
        </label>
        <label htmlFor="fastest" className={styles["label-filter"]}>
          Самый быстрый
          <input
            type="radio"
            id="fastest"
            name="filter"
            value="fastest"
            className={styles["input-filter"]}
          />
        </label>
        <label htmlFor="optimal" className={styles["label-filter"]}>
          Оптимальный
          <input
            type="radio"
            id="optimal"
            value="optimal"
            name="filter"
            className={styles["input-filter"]}
          />
        </label>
      </form>
      {/*<div style={{ height: 5, textAlign: "center" }}></div>*/}
    </>
  );
}
