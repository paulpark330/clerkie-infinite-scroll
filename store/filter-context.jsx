"use client";

import { createContext, useState, useEffect } from "react";

export const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const defaultCheckedValues = {
    closeFriends: false,
    superCloseFriends: false,
  };

  const [deepSearch, setDeepSearch] = useState("");
  const [quickSearch, setQuickSearch] = useState("");

  const [checkedValues, setCheckedValues] = useState(() => {
    const storedCheckedValues =
      typeof window !== "undefined"
        ? JSON.parse(window.localStorage.getItem("checkedValues"))
        : null;
    return storedCheckedValues ?? defaultCheckedValues;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "checkedValues",
        JSON.stringify(checkedValues)
      );
    }
  }, [checkedValues]);

  const updateCheckedValues = (newValues) => {
    setCheckedValues(newValues);
  };

  const updateDeepSearch = (searchTerm) => {
    setDeepSearch(searchTerm);
  };

  const updateQuickSearch = (searchTerm) => {
    setQuickSearch(searchTerm);
  };

  return (
    <FilterContext.Provider
      value={{
        checkedValues,
        updateCheckedValues,
        deepSearch,
        updateDeepSearch,
        quickSearch,
        updateQuickSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
