import styles from "./FriendDetails.module.scss";
import Image from "next/image";

const FriendDetails = ({ friend }) => {
  const friendStatus = {
    0: { name: "Friends", className: "friends" },
    1: { name: "Close Friends", className: "close-friends" },
    2: { name: "Super Close Friends", className: "super-close-friends" },
  };

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <p>
          {friend.firstName} {friend.lastName}
        </p>
        <div
          className={styles[`${friendStatus[friend.friendStatus].className}`]}
        >
          {friendStatus[friend.friendStatus].name}
        </div>
      </div>
      <div className={styles.image}>
        <Image
          width={200}
          height={200}
          src="/assets/clerkie-icon.svg"
          alt="profile image"
        />
      </div>
      <div className={styles.email}>{friend.email}</div>
      <div className={styles["phone-number"]}>{friend.phoneNumber}</div>
    </div>
  );
};

export default FriendDetails;
