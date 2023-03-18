import Navbar from "../components/Navbar/Navbar";
import styles from "./layout.module.scss";
import "@/styles/globals.scss";
import "@/styles/reset.scss";
import { Inter } from "next/font/google";
import { FilterProvider } from "@/store/filter-context";
import { FriendProvider } from "@/store/friends-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Clerkie Infinite Scroll",
  description: "Clerkie Frontend Challenge 2023",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={inter.className}>
      <body className={styles.container}>
        <FilterProvider>
          <FriendProvider>
            <Navbar />
            <main className={styles.main}>{children}</main>
          </FriendProvider>
        </FilterProvider>
      </body>
    </html>
  );
};

export default RootLayout;
