import { FilterContext } from "@/store/filter-context";
import { useContext, useMemo } from "react";

const useFriendFilter = (allFriends) => {
  const { checkedValues } = useContext(FilterContext);
  return useMemo(() => {
    const { closeFriends, superCloseFriends } = checkedValues;

    if (!closeFriends && !superCloseFriends) {
      return allFriends;
    }

    const filtered = allFriends.filter((friend) => {
      if (closeFriends && superCloseFriends) {
        return (
          friend.attributes.friendStatus === 1 ||
          friend.attributes.friendStatus === 2
        );
      }

      if (closeFriends) {
        return friend.attributes.friendStatus === 1;
      }

      if (superCloseFriends) {
        return friend.attributes.friendStatus === 2;
      }
    });

    return filtered;
  }, [allFriends, checkedValues]);
};

export default useFriendFilter;
