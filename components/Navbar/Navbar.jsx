"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Navbar.module.scss";

const Navbar = () => {

  const links = [
    { href: "/", imgSrc: "/assets/home-icon.svg", text: "Home" },
    { href: "/friends", imgSrc: "/assets/friends-icon.svg", text: "Friends" },
  ];

  return (
    <nav className={styles.container}>
      <Link href={"/"} className={styles["logo-container"]}>
        <Image
          width={20}
          height={20}
          alt="logo"
          src="/assets/clerkie-icon.svg"
        />
        <div className={styles.name}>Clerkie Challenge</div>
      </Link>
      <ul className={styles.menu}>
        {links.map((link) => (
          <Link className={styles.item} key={link.href} href={link.href}>
            <Image width={24} height={24} src={link.imgSrc} alt="icon" />
            <div>{link.text}</div>
          </Link>
        ))}
        <ThemeToggle />
      </ul>
  </nav>
  );
};

export default Navbar;
