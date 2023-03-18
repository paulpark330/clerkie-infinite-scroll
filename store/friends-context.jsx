"use client";

import { createContext, useState, useEffect } from "react";

export const FriendContext = createContext(null);

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);

  const addFriends = (newFriends) => {
    setFriends((prevFriends) => [...prevFriends, ...newFriends]);
  };

  return (
    <FriendContext.Provider
      value={{
        friends,
        addFriends,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};
