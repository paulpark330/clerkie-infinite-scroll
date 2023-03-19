import Header from "@/components/Header/Header";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <main className={styles.main}>
      <Header title="Home" />
      <div className={styles.content}></div>
    </main>
  );
};

export default Home;
