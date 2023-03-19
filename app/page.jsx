import Header from "@/components/Header/Header";
import Image from "next/image";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.main}>
      <Header title="Home" />
      <div className={styles.content}>
        <Image width={300} height={300} src="/assets/clerkie-icon.svg" alt="logo" />
      </div>
    </main>
  );
};

export default HomePage;
