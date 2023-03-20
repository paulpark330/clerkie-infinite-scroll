"use client";

import { createContext, useState } from "react";

export const NavContext = createContext(null);

export const NavProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    console.log("navOpen: ", navOpen);
    setNavOpen(!navOpen);
  };

  return (
    <NavContext.Provider
      value={{
        navOpen,
        toggleNav,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
