import styles from "./FriendListSkeleton.module.scss";

const FriendListSkeleton = ({ count }) => {
  const skeletonItems = new Array(count).fill(null);

  return (
    <>
      {skeletonItems.map((_, index) => (
        <li className={styles.friend} key={index}>
          <div className={styles.loading}></div>
          <div className={styles.name}></div>
          <div className={styles.contact}></div>
        </li>
      ))}
    </>
  );
};

export default FriendListSkeleton;
