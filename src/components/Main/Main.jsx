import TransferOptions from "../TransferOptions/TransferOptions.jsx";
import styles from "./Main.module.css";
import FilterAndTickets from "../FilterAndTickets/FilterAndTickets.jsx";

export default function Main() {
  return (
    <main className={styles["main"]}>
      <TransferOptions />
      <FilterAndTickets />
    </main>
  );
}
