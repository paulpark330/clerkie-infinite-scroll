"use client";

import useSWRInfinite from "swr/infinite";
import { useState, useEffect, useContext, useRef } from "react";
import Friend from "@/components/Friend/Friend";
import styles from "./FriendList.module.scss";
import { FilterContext } from "@/store/filter-context";
import FriendListSkeleton from "./FriendListSkeleton";
import useFriendFilter from "@/hooks/useFriendFilter";

const PAGE_SIZE = 10;
const API_URL = "https://strapi-clerkie-infinite-scroll.up.railway.app/api";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();

  // Simulate slow network to see the loading state

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(res.json());
  //   }, 500);
  // });
};

const FriendList = () => {
  const { deepSearch, quickSearch } = useContext(FilterContext);
  const [lastPage, setLastPage] = useState(false);
  const [fetchedFriends, setFetchedFriends] = useState([]);
  const [renderedList, setRenderedList] = useState([]);
  const [isQuickSearching, setIsQuickSearching] = useState(false);
  const [isDeepSearching, setIsDeepSearching] = useState(false);
  const loadMoreButtonRef = useRef();
  const currentLoadMoreButtonRef = loadMoreButtonRef.current;

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data.length) return null;

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

    return [
      `${API_URL}/friends?sort[0]=id&pagination[page]=${
        pageIndex + 1
      }&pagination[pageSize]=${PAGE_SIZE}`,
    ];
  };

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const allFriends = data ? data.flatMap((page) => page.data) : [];
    setFetchedFriends(allFriends);
  }, [data]);

  //Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !isLoading &&
            !isValidating &&
            !lastPage &&
            !isQuickSearching &&
            !isDeepSearching
          ) {
            setSize(size + 1);
          }
        });
      },
      {
        rootMargin: "0px",
      }
    );

    if (currentLoadMoreButtonRef) {
      observer.observe(currentLoadMoreButtonRef);
    }

    return () => {
      if (currentLoadMoreButtonRef) {
        observer.unobserve(currentLoadMoreButtonRef);
      }
    };
  }, [
    isLoading,
    isValidating,
    lastPage,
    isQuickSearching,
    isDeepSearching,
    setSize,
    size,
    currentLoadMoreButtonRef,
  ]);

  // Quick Search Logic
  useEffect(() => {
    if (quickSearch.trim().length > 0) {
      setIsQuickSearching(true);
      const quickSearchedFriends = fetchedFriends.filter((friend) => {
        const fullName = `${friend.attributes.firstName} ${friend.attributes.lastName}`;
        return fullName.toLowerCase().includes(quickSearch.toLowerCase());
      });

      setRenderedList(quickSearchedFriends);
    } else {
      setRenderedList(fetchedFriends);
      setIsQuickSearching(false);
    }
  }, [fetchedFriends, quickSearch]);

  // Deep Search Logic
  useEffect(() => {
    const deepSearchFriends = async () => {
      if (deepSearch.trim().length > 0) {
        const encodedSearchTerm = encodeURIComponent(deepSearch.trim());

        const searchQueryParams = `&filters[$or][0][firstName][$containsi]=${encodedSearchTerm}&filters[$or][1][lastName][$containsi]=${encodedSearchTerm}`;

        setIsDeepSearching(true);

        const res = await fetch(
          `${API_URL}/friends?sort[0]=id&pagination[page]=1&pagination[pageSize]=200&${searchQueryParams}`
        );

        const deepSearchedFriends = await res.json();
        setRenderedList(deepSearchedFriends.data);
        setIsQuickSearching(false);
        setIsDeepSearching(false);
      }
    };

    deepSearchFriends();
  }, [deepSearch]);

  const filteredFriends = useFriendFilter(renderedList);

  return (
    <ul className={styles.friends}>
      {filteredFriends.map((friend) => (
        <Friend
          friend={friend.attributes}
          friendId={friend.id}
          key={friend.id}
        />
      ))}

      {(isLoading || isValidating) && !lastPage && (
        <FriendListSkeleton count={10} />
      )}

      {(isDeepSearching || isQuickSearching) && (
        <>
          <FriendListSkeleton count={1} />
          <div className={styles.more}>
            🔎 Searching for &quot;{quickSearch}&quot; 🔎
          </div>
        </>
      )}

      {!isQuickSearching && !isDeepSearching && !filteredFriends.length && (
        <div className={styles.more}>
          🥺 No results found for &quot;{deepSearch}&quot; 🥺
        </div>
      )}

      {!lastPage && !quickSearch.length && (
        <button className={styles.more} ref={loadMoreButtonRef}>
          🥳 Load more friends 🥳
        </button>
      )}

      {lastPage && (
        <div className={styles["last-page"]}>
          🥳 You have so many friends! 🥳
        </div>
      )}
    </ul>
  );
};

export default FriendList;
