import styles from "./Header.module.scss";

const Header = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Header;
