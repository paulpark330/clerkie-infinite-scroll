"use client";

import styles from "./FriendList.module.scss";
import Friend from "@/components/Friend/Friend";
import { useState, useContext, useEffect } from "react";
import { FriendContext } from "@/store/friends-context";
import { getMoreFriends } from "@/helpers/api-utils";

const FriendList = ({ initialFriends }) => {
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const { friends, addFriends } = useContext(FriendContext);

  useEffect(() => {
    addFriends(initialFriends);
  }, [initialFriends]);

  const handleClick = async () => {
    const data = await getMoreFriends(page + 1, 10);

    if (data.meta.pagination.page === data.meta.pagination.pageCount) {
      setIsLastPage(true);
    }

    addFriends(data.data);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <ul className={styles.friends}>
        {friends.map((friend) => (
          <Friend friend={friend.attributes} key={friend.id} />
        ))}
      </ul>
      {!isLastPage && (
        <button className={styles["load-more-btn"]} onClick={handleClick}>
          Load more
        </button>
      )}
    </>
  );
};

export default FriendList;
