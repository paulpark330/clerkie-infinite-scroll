import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import Filter from "@/components/Filter/Filter";
import FriendList from "@/components/Friend/FriendList/FriendList";

const Friends = async () => {

  return (
    <div className={styles.container}>
      <Header title="Friends" />
      <main className={styles.main}>
        <Filter />
        <FriendList />
      </main>
    </div>
  );
};

export default Friends;
