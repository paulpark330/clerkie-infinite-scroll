"use client";

import useSWRInfinite from "swr/infinite";
import { useState, useEffect } from "react";
import Friend from "@/components/Friend/Friend";
import styles from "./FriendList.module.scss";

const PAGE_SIZE = 10;
const API_URL = "https://strapi-clerkie-infinite-scroll.up.railway.app/api";

const FriendList = () => {
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const { data, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      window.document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight && !lastPage) {
      setSize((size) => size + 1);
    }
  };

  const allFriends = data ? data.flatMap((page) => page.data) : [];

  return (
    <ul onScroll={handleScroll} className={styles.friends}>
      {allFriends.map((friend) => (
        <Friend friend={friend.attributes} key={friend.id} />
      ))}
      {lastPage && (
        <div className={styles["last-page"]}>
          🥳 You have so many friends! 🥳
        </div>
      )}
      {isValidating && !lastPage && (
        <div className={styles["loading"]}>Loading...</div>
      )}
    </ul>
  );
};

export default FriendList;
