"use client";

import { createContext, useState, useEffect } from "react";

export const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const defaultCheckedValues = {
    closeFriends: false,
    superCloseFriends: false,
  };

  const [searchTerms, setSearchTerms] = useState("");
  const [liveTerms, setLiveTerms] = useState("");

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

  const updateSearchTerms = (searchTerm) => {
    setSearchTerms(searchTerm);
  };

  const updateLiveTerms = (liveTerm) => {
    setLiveTerms(liveTerm);
  };

  return (
    <FilterContext.Provider
      value={{
        checkedValues,
        updateCheckedValues,
        searchTerms,
        updateSearchTerms,
        liveTerms,
        updateLiveTerms,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
