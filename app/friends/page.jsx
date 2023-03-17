import { Inter } from "next/font/google";
import styles from "./page.module.scss";

const inter = Inter({ subsets: ["latin"] });

const Friends = () => {
  return (
    <main className={styles.main}>
      <h1 className={inter.className}>Friends</h1>
    </main>
  );
};

export default Friends;
