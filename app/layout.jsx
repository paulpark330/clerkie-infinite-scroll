import Navbar from "../components/Navbar/Navbar";
import styles from "./layout.module.scss";
import "@/styles/globals.scss";
import "@/styles/reset.scss";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";

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
        <Navbar />
        <main className={styles.main}>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
