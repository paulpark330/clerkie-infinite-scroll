"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Navbar.module.scss";
import { useContext } from "react";
import { Box, Drawer, List, ListItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NavContext } from "@/store/nav-context";

const links = [
  { href: "/", imgSrc: "/assets/home-icon.svg", text: "Home" },
  { href: "/friends", imgSrc: "/assets/friends-icon.svg", text: "Friends" },
];

const Navbar = () => {
  const { navOpen, toggleNav } = useContext(NavContext);

  const isMobile = useMediaQuery("@media (max-width:700px)");

  const drawerWidth = 250;

  const toggleDrawer = () => {
    toggleNav();
  };

  const list = () => (
    <Box sx={{ width: drawerWidth }}>
      <List className={styles.menu}>
        <ListItem>
          <Link href={"/"} className={styles["logo-container"]}>
            <Image
              width={20}
              height={20}
              alt="logo"
              src="/assets/clerkie-icon.svg"
            />
            <div className={styles.name}>Clerkie Challenge</div>
          </Link>
        </ListItem>
        {links.map((link) => (
          <ListItem key={link.href} onClick={toggleDrawer}>
            <Link className={styles.item} href={link.href}>
              <Image width={24} height={24} src={link.imgSrc} alt="icon" />
              <div>{link.text}</div>
            </Link>
          </ListItem>
        ))}
        <ListItem>
          <ThemeToggle />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav className={styles.container}>
      <Drawer
        anchor="left"
        open={navOpen}
        onClose={toggleDrawer}
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            backgroundColor: "#091928",
            padding: "30px 15px",
          },
          "& .MuiList-root": {
            padding: 0,
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          },
          "& .MuiListItem-root": {
            padding: 0,
            justifyContent: "flex-start",
          },
          "& .MuiBox-root": {
            width: "auto",
          },
        }}
      >
        {list()}
      </Drawer>
    </nav>
  );
};

export default Navbar;
