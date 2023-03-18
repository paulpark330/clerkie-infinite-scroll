"use client";

import useSWRInfinite from "swr/infinite";
import { useState } from "react";
import Friend from "@/components/Friend/Friend";
import styles from "./FriendList.module.scss";

const PAGE_SIZE = 10;
const API_URL = "https://strapi-clerkie-infinite-scroll.up.railway.app/api";

const FriendList = () => {
  const [lastPage, setLastPage] = useState(false);

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data.length) {
      return null;
    }
    if (pageIndex === 0) {
      return [
        `${API_URL}/friends?sort[0]=id&pagination[pageSize]=${PAGE_SIZE}`,
      ];
    }

    if (
      previousPageData.meta.pagination.page ===
      previousPageData.meta.pagination.pageCount
    ) {
      setLastPage(true);
      return null;
    }

    const nextPage = previousPageData.meta.pagination.page + 1;
    return [
      `${API_URL}/friends?sort[0]=id&pagination[page]=${nextPage}&pagination[pageSize]=${PAGE_SIZE}`,
    ];
  };

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  };

  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && !isValidating) {
      setSize(size + 1);
    }
  };

  const allFriends = data ? data.flatMap((page) => page.data) : [];

  return (
    <ul onScroll={handleScroll} className={styles.friends}>
      {allFriends.map((friend) => (
        <Friend friend={friend.attributes} key={friend.id} />
      ))}
      {lastPage && (
        <div className={styles["last-page"]}>🥳 You have so many friends! 🥳</div>
      )}
    </ul>
  );
};

export default FriendList;
