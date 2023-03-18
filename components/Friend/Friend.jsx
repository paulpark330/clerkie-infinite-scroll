"use client";

import { useState } from "react";
import styles from "./Friend.module.scss";

const Friend = ({ friend }) => {
  const friendStatus = {
    0: { name: "Friends", className: "friends" },
    1: { name: "Close Friends", className: "close-friends" },
    2: { name: "Super Close Friends", className: "super-close-friends" },
  };

  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);

  const handleMouseMove = (event) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width - 0.5) * 10;
    const y = ((event.clientY - top) / height - 0.5) * 10;
    setHoverX(x);
    setHoverY(y);
  };

  const handleMouseLeave = () => {
    setHoverX(0);
    setHoverY(0);
  };

  return (
    <li
      className={styles.friend}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${hoverX}px, ${hoverY}px)` }}
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
    </li>
  );
};

export default Friend;
