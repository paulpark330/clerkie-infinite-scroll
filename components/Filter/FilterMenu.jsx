import { Menu } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import styles from "./FilterMenu.module.scss";

const FilterMenu = ({ handleClose, anchorEl, open }) => {
  const [checkedValues, setCheckedValues] = useState({
    closeFriends: false,
    superCloseFriends: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(checkedValues);
    handleClose();
  };

  const handleChange = (e) => {
    setCheckedValues({
      ...checkedValues,
      [e.target.name]: e.target.checked,
    });
  };

  const isDisabled = !Object.values(checkedValues).some((val) => val);

  return (
    <Menu
      onClose={handleClose}
      open={open}
      anchorEl={anchorEl}
      MenuListProps={{ disablePadding: true }}
      PaperProps={{
        sx: {
          width: 320,
          height: 286,
          padding: 0,
          mt: "10px",
        },
      }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles["clear-btn"]}>Clear all</button>
          <div className={styles.title}>Filter</div>
          <button onClick={handleClose} className={styles["close-btn"]}>
            <Image
              width={9}
              height={9}
              src="/assets/close-icon.svg"
              alt="close-icon"
            />
          </button>
        </div>
        <form className={styles["filter-form"]} onSubmit={handleSubmit}>
          <div className={styles["filter-content"]}>
            <div className={styles.description}>Friend Status</div>
            <div className={styles.options}>
              <div>Close Friends</div>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="closeFriends"
                checked={checkedValues.closeFriends}
                onChange={handleChange}
              />
            </div>
            <div className={styles.options}>
              <div>Super Close Friends</div>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="superCloseFriends"
                checked={checkedValues.superCloseFriends}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className={styles["submit-btn"]}
            disabled={isDisabled}
          >
            Apply
          </button>
        </form>
      </div>
    </Menu>
  );
};

export default FilterMenu;
