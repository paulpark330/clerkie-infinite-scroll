import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import Filter from "@/components/Filter/Filter";
import FriendList from "@/components/FriendList/FriendList";
import { Suspense } from "react";

const FriendsPage = async () => {
  return (
    <Suspense>
      <div className={styles.container}>
        <Header title="Friends" />
        <main className={styles.main}>
          <Filter />
          <FriendList />
        </main>
      </div>
    </Suspense>
  );
};

export default FriendsPage;
