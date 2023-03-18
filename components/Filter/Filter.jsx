"use client";

import styles from "./Filter.module.scss";
import { useState } from "react";
import Image from "next/image";
import FilterMenu from "./FilterMenu";

const Filter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.filter}>
      <button
        onClick={toggleMenu}
        className={open ? styles["filter-btn-active"] : styles["filter-btn"]}
      >
        <Image
          width={20}
          height={20}
          src={open ? "/assets/filter-icon-dark.svg" : "/assets/filter-icon.svg"}
          alt="filter-icon"
        />
      </button>
      <div className={styles.divider}></div>
      <button className={styles["clear-btn"]}>Clear all</button>
      {open && (
        <FilterMenu open={open} handleClose={handleClose} anchorEl={anchorEl} />
      )}
    </div>
  );
};

export default Filter;
