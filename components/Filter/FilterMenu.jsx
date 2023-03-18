import { Menu } from "@mui/material";
import Image from "next/image";
import { useState, useContext } from "react";
import styles from "./FilterMenu.module.scss";
import { FilterContext } from "@/store/filter-context";

const FilterMenu = ({ handleClose, anchorEl, open }) => {
  const { checkedValues, updateCheckedValues } = useContext(FilterContext);

  const [localValues, setLocalValues] = useState({
    closeFriends: checkedValues.closeFriends,
    superCloseFriends: checkedValues.superCloseFriends,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCheckedValues(localValues);
    handleClose();
  };

  const handleChange = (e) => {
    setLocalValues({
      ...localValues,
      [e.target.name]: e.target.checked,
    });
  };

  const handleClearAll = () => {
    const newCheckedValues = Object.fromEntries(
      Object.keys(checkedValues).map((key) => [key, false])
    );
    setLocalValues(newCheckedValues)
    updateCheckedValues(newCheckedValues);
  };

  const hasCheckedFilters = Object.values(checkedValues).some((val) => val);

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
          <button
            onClick={handleClearAll}
            className={
              hasCheckedFilters
                ? styles["clear-btn-active"]
                : styles["clear-btn"]
            }
          >
            Clear all
          </button>
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
                checked={localValues.closeFriends}
                onChange={handleChange}
              />
            </div>
            <div className={styles.options}>
              <div>Super Close Friends</div>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="superCloseFriends"
                checked={localValues.superCloseFriends}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className={styles["submit-btn"]}>
            Apply
          </button>
        </form>
      </div>
    </Menu>
  );
};

export default FilterMenu;
