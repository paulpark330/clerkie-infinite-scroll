import styles from "./page.module.scss";
import Header from "@/components/Header/Header";

const Loading = () => {
  return (
    <div className={styles.container}>
      <Header title="Loading..." />
      <main className={styles.main}></main>
    </div>
  );
};

export default Loading;
