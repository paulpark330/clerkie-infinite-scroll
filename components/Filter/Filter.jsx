"use client";

import { useState, useContext, useEffect } from "react";
import styles from "./Filter.module.scss";
import Image from "next/image";
import FilterMenu from "./FilterMenu";
import { FilterContext } from "@/store/filter-context";
import debounce from "@/lib/debounce";

const Filter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { checkedValues, updateCheckedValues, updateSearchTerm } =
    useContext(FilterContext);
  const [checkedItemsCount, setCheckedItemsCount] = useState(0);

  useEffect(() => {
    const count = Object.values(checkedValues).filter((val) => val).length;
    setCheckedItemsCount(count);
  }, [checkedValues]);

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearAll = () => {
    const newCheckedValues = Object.fromEntries(
      Object.keys(checkedValues).map((key) => [key, false])
    );
    updateCheckedValues(newCheckedValues);
  };

  const handleSearch = debounce((e) => {
    updateSearchTerm(e.target.value);
  }, 500);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <button
          onClick={toggleMenu}
          className={
            open || checkedItemsCount > 0
              ? styles["filter-btn-active"]
              : styles["filter-btn"]
          }
        >
          <Image
            width={20}
            height={20}
            src={
              open || checkedItemsCount > 0
                ? "/assets/filter-icon-dark.svg"
                : "/assets/filter-icon.svg"
            }
            alt="filter-icon"
          />
          {checkedItemsCount > 0 && (
            <div className={styles["filter-count"]}>{checkedItemsCount}</div>
          )}
        </button>
        <div className={styles.divider}></div>
        <button
          onClick={handleClearAll}
          className={
            checkedItemsCount > 0
              ? styles["clear-btn-active"]
              : styles["clear-btn"]
          }
        >
          Clear all
        </button>
        {open && (
          <FilterMenu
            open={open}
            handleClose={handleClose}
            anchorEl={anchorEl}
          />
        )}
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Filter;
