import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const links = [
    { href: "/", imgSrc: "/assets/home-icon.png", text: "Home" },
    { href: "/friends", imgSrc: "/assets/friends-icon.png", text: "Friends" },
  ];

  return (
    <nav className={styles.container}>
      <Link href={"/"} className={styles["logo-container"]}>
        <Image
          width={20}
          height={20}
          alt="logo"
          src="/assets/clerkie-icon.png"
        />
        <div className={styles.name}>Clerkie Challenge</div>
      </Link>
      <ul className={styles.menu}>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <div className={styles.item}>
              <Image width={24} height={24} src={link.imgSrc} alt="icon" />
              <div>{link.text}</div>
            </div>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;



