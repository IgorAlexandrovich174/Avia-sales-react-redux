import Header from "../Header/Header.jsx";
import styles from "./App.module.css";
import Main from "../Main/Main.jsx";

export default function App() {
  return (
    <div className={styles["container"]}>
      <div className={styles["page-container"]}>
        <Header />
        <Main />
      </div>
    </div>
  );
}
