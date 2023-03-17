import styles from "./Header.module.scss";

const Header = ({ title }) => {
  return (
    <div className={styles.container}>
      <h1>Friends</h1>
    </div>
  );
};

export default Header;
