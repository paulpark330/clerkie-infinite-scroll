"use client";

import useSWRInfinite from "swr/infinite";
import { useState, useEffect, useContext } from "react";
import Friend from "@/components/Friend/Friend";
import styles from "./FriendList.module.scss";
import { FilterContext } from "@/store/filter-context";
import FriendListSkeleton from "./FriendListSkeleton";

const PAGE_SIZE = 10;
const API_URL = "https://strapi-clerkie-infinite-scroll.up.railway.app/api";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  // return res.json();
  // Simulate slow network to see the loading state
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res.json());
    }, 5000);
  });
};

const FriendList = () => {
  const { checkedValues, searchTerms, liveTerms } = useContext(FilterContext);
  const [lastPage, setLastPage] = useState(false);
  const [renderedList, setRenderedList] = useState([]);

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data.length) return null;

    const encodedSearchTerm = encodeURIComponent(searchTerms.trim());

    const searchQueryParams =
      searchTerms.length > 0
        ? `&filters[$or][0][firstName][$containsi]=${encodedSearchTerm}&filters[$or][1][lastName][$containsi]=${encodedSearchTerm}`
        : "";

    if (pageIndex === 0) {
      return [
        `${API_URL}/friends?sort[0]=id&pagination[pageSize]=${PAGE_SIZE}${searchQueryParams}`,
      ];
    }

    if (
      previousPageData.meta.pagination.page ===
      previousPageData.meta.pagination.pageCount
    ) {
      setLastPage(true);
      return null;
    }

    return [
      `${API_URL}/friends?sort[0]=id&pagination[page]=${
        pageIndex + 1
      }&pagination[pageSize]=${PAGE_SIZE}${searchQueryParams}`,
    ];
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      window.document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 80) {
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

  const searchFriends = (liveTerms, allFriends) => {
    return allFriends.filter((friend) =>
      friend.attributes.firstName.toLowerCase().includes(liveTerms.toLowerCase().trim())
    );
  };

  const filteredFriends = filterFriends(checkedValues, allFriends);

  if (liveTerms) {
    console.log("searchFriends : ", searchFriends(liveTerms, allFriends));
  }

  return (
    <ul className={styles.friends}>
      {filteredFriends.map((friend) => (
        <Friend
          friend={friend.attributes}
          friendId={friend.id}
          key={friend.id}
        />
      ))}
      {lastPage && (
        <div className={styles["last-page"]}>
          🥳 You have so many friends! 🥳
        </div>
      )}
      {(isLoading || isLoadingMore) && !lastPage && <FriendListSkeleton />}
      {!lastPage && !isLoadingMore && (
        <button className={styles.more} onClick={handleClick}>
          🥳 Load more friends 🥳
        </button>
      )}
    </ul>
  );
};

export default FriendList;
