import styles from "./TransferOptions.module.css";
import {
  toggleSelectAll,
  toggleTransferOption,
} from "../../slice/filterSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function TransferOptions() {
  const dispatch = useDispatch();
  const selectAllOptions = useSelector(
    (state) => state.filter.transferSettings.selectAllOptions,
  );
  const selectedTransfers = useSelector(
    (state) => state.filter.transferSettings.selectedTransfers,
  );

  return (
    <div className={styles["wrapper-form"]}>
      <form className={styles["form-transfer"]}>
        <fieldset className={styles["fieldset"]}>
          <legend style={{ marginBottom: 20 }}>Количество пересадок</legend>
          <label htmlFor="all" className={styles["label-options"]}>
            <input
              type="checkbox"
              className={styles["input-options"]}
              onChange={() => dispatch(toggleSelectAll())}
              checked={selectAllOptions}
              name="all"
              id="all"
            />
            <span className={styles["check"]}></span>
            Все
          </label>
          <label htmlFor="no-transfer" className={styles["label-options"]}>
            <input
              type="checkbox"
              className={styles["input-options"]}
              name="no-transfer"
              id="no-transfer"
              checked={selectedTransfers["0"]}
              onChange={() => dispatch(toggleTransferOption(0))}
            />
            <span className={styles["check"]}></span>
            Без пересадок
          </label>
          <label htmlFor="1-transfer" className={styles["label-options"]}>
            <input
              type="checkbox"
              className={styles["input-options"]}
              name="1-transfer"
              id="1-transfer"
              checked={selectedTransfers["1"]}
              onChange={() => dispatch(toggleTransferOption(1))}
            />
            <span className={styles["check"]}></span>1 пересадка
          </label>
          <label htmlFor="2-transfer" className={styles["label-options"]}>
            <input
              type="checkbox"
              className={styles["input-options"]}
              name="2-transfer"
              id="2-transfer"
              checked={selectedTransfers["2"]}
              onChange={() => dispatch(toggleTransferOption(2))}
            />
            <span className={styles["check"]}></span>2 пересадки
          </label>
          <label htmlFor="3-transfer" className={styles["label-options"]}>
            <input
              type="checkbox"
              className={styles["input-options"]}
              name="3-transfer"
              id="3-transfer"
              checked={selectedTransfers["3"]}
              onChange={() => dispatch(toggleTransferOption(3))}
            />
            <span className={styles["check"]}></span>3 пересадки
          </label>
        </fieldset>
      </form>
    </div>
  );
}
