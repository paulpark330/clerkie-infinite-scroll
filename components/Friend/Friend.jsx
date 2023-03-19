"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Friend.module.scss";

const Friend = ({ friend, friendId }) => {
  const friendStatus = {
    0: { name: "Friends", className: "friends" },
    1: { name: "Close Friends", className: "close-friends" },
    2: { name: "Super Close Friends", className: "super-close-friends" },
  };

  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);
  const [scale, setScale] = useState(1);

  const handleMouseMove = (event) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width - 0.5) * 50;
    const y = ((event.clientY - top) / height - 0.5) * 30;
    setHoverX(x);
    setHoverY(y);
    setScale(1.05);
  };

  const handleMouseLeave = () => {
    setHoverX(0);
    setHoverY(0);
    setScale(1);
  };

  return (
    <Link
      href={`/friends/${friendId}`}
      className={styles.friend}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${hoverX}px, ${hoverY}px) scale(${scale})`,
      }}
    >
      <div className={styles.name}>
        <p>{`${friend.firstName} ${friend.lastName}`}</p>
        <div
          className={styles[`${friendStatus[friend.friendStatus].className}`]}
        >
          {friendStatus[friend.friendStatus].name}
        </div>
      </div>
      <div className={styles.contact}>
        {`${friend.email} • ${friend.phoneNumber}`}
      </div>
    </Link>
  );
};

export default Friend;
