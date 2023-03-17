import styles from "./Friend.module.scss";

const Friend = ({ friend }) => {
  const friendStatus = {
    0: { name: "Friends", className: "friends" },
    1: { name: "Close Friends", className: "close-friends" },
    2: { name: "Super Close Friends", className: "super-close-friends" },
  };

  return (
    <li className={styles.friend}>
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
