import styles from "./FriendListSkeleton.module.scss";

const FriendListSkeleton = () => {
  const skeletonItems = new Array(10).fill(null);

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
