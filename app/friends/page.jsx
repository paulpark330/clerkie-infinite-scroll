import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import Filter from "@/components/Filter/Filter";
import FriendList from "@/components/Friend/FriendList/FriendList";

import { getInitialFriends } from "@/helpers/api-utils";

const getFriends = async () => {
  const data = await getInitialFriends();
  return data;
};

const Friends = async () => {
  const initialFriends = await getFriends();

  return (
    <div className={styles.container}>
      <Header title="Friends" />
      <main className={styles.main}>
        <Filter />
        <FriendList initialFriends={initialFriends} />
      </main>
    </div>
  );
};

export default Friends;
