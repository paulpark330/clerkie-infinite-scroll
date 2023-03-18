import Header from "@/components/Header/Header";
import Image from "next/image";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <main className={styles.main}>
      <Header title="Home" />
      <div className={styles.content}>
        {/* <Image width={400} height={400} src="/assets/clerkie-icon.svg" alt="logo" /> */}
      </div>
    </main>
  );
};

export default Home;
