import Header from "@/components/Header/Header";
import { Suspense } from "react";
import styles from "./page.module.scss";
import FriendDetails from "@/components/FriendDetails/FriendDetails";

export const dynamicParams = true;

export const generateStaticParams = async () => {
  let res;
  res = await fetch(
    "https://strapi-clerkie-infinite-scroll.up.railway.app/api/friends?sort[0]=id&pagination[page]=1&pagination[pageSize]=200"
  );
  const firstPage = await res.json();

  const friends = [...firstPage.data];

  const mappedFriends = friends.map((friend) => ({
    slug: friend.id,
  }));

  return mappedFriends;
};

const getFriend = async (slug) => {
  const res = await fetch(
    `https://strapi-clerkie-infinite-scroll.up.railway.app/api/friends/${slug}`
  );
  const friend = await res.json();
  return friend;
};

const FriendDetailsPage = async ({ params }) => {
  const friend = await getFriend(params.slug);

  let headerTitle = "Friend Not Found";
  if (friend.data) {
    headerTitle = `${friend.data.attributes.firstName} ${friend.data.attributes.lastName}`;
  }

  return (
    <Suspense>
      <div className={styles.container}>
        <Header title={headerTitle} />
        <main className={styles.main}>
          <FriendDetails friend={friend.data.attributes} />
        </main>
      </div>
    </Suspense>
  );
};

export default FriendDetailsPage;
