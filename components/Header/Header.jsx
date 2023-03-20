"use client";

import { NavContext } from "@/store/nav-context";
import Image from "next/image";
import { useContext } from "react";
import styles from "./Header.module.scss";
import { useTheme } from "@/hooks/useTheme";
import { useMediaQuery } from "@mui/material";

const Header = ({ title }) => {
  const { toggleNav } = useContext(NavContext);
  const { theme } = useTheme();

  const isMobile = useMediaQuery("@media (max-width:700px)");

  return (
    <div className={styles.container}>
      {isMobile && (
        <Image
          className={styles.menu}
          width={15}
          height={15}
          src={
            theme === "light"
              ? "/assets/menu-icon.svg"
              : "/assets/menu-icon-dark.svg"
          }
          alt="menu"
          onClick={toggleNav}
        />
      )}
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Header;
