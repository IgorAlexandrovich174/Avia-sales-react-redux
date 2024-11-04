import styles from "./Header.module.css";
export default function Header() {
  return (
    <div className={styles["header"]}>
      <img src="/Logo.svg" alt="Logo" width={60} height={60} loading={"lazy"} />
    </div>
  );
}
