import Header from "@/components/Header/Header";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <main className={styles.main}>
      <Header title="Home" />
      <h1>Home</h1>
    </main>
  );
};

export default Home;
