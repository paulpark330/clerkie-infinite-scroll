"use client";

import useSWRInfinite from "swr/infinite";
import { useState, useEffect, useContext } from "react";
import Friend from "@/components/Friend/Friend";
import styles from "./FriendList.module.scss";
import { FilterContext } from "@/store/filter-context";
import FriendListSkeleton from "./FriendListSkeleton";

const PAGE_SIZE = 10;
const API_URL = "https://strapi-clerkie-infinite-scroll.up.railway.app/api";

const FriendList = () => {
  const [lastPage, setLastPage] = useState(false);
  const { checkedValues } = useContext(FilterContext);

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
    // Simulate slow network to see the loading state
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res.json());
      }, 1000);
    });
  };

  const { data, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      window.document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight && !lastPage) {
      setSize((size) => size + 1);
    }
  };

  const handleClick = () => {
    setSize((size) => size + 1);
  };

  const allFriends = data ? data.flatMap((page) => page.data) : [];

  const filterFriends = (checkedValues, allFriends) => {
    const { closeFriends, superCloseFriends } = checkedValues;

    if (!closeFriends && !superCloseFriends) {
      return allFriends;
    }

    const filtered = allFriends.filter((friend) => {
      if (closeFriends && superCloseFriends) {
        return (
          friend.attributes.friendStatus === 1 ||
          friend.attributes.friendStatus === 2
        );
      }

      if (closeFriends) {
        return friend.attributes.friendStatus === 1;
      }

      if (superCloseFriends) {
        return friend.attributes.friendStatus === 2;
      }
    });
    return filtered;
  };

  const filteredFriends = filterFriends(checkedValues, allFriends);

  return (
    <ul className={styles.friends}>
      {filteredFriends.map((friend) => (
        <Friend friend={friend.attributes} friendId={friend.id} key={friend.id} />
      ))}
      {lastPage && (
        <div className={styles["last-page"]}>
          🥳 You have so many friends! 🥳
        </div>
      )}
      {isValidating && !lastPage && <FriendListSkeleton />}
      {!isValidating && !lastPage && (
        <button className={styles.more} onClick={handleClick}>
          🥳 Load more friends 🥳
        </button>
      )}
    </ul>
  );
};

export default FriendList;
