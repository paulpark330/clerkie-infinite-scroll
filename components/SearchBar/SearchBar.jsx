import { FilterContext } from "@/store/filter-context";
import { useCallback, useContext } from "react";
import styles from "./SearchBar.module.scss";
import debounce from "@/lib/debounce";

const SearchBar = () => {
  const { updateDeepSearch, updateQuickSearch } = useContext(FilterContext);
  const debouncedUpdateDeepSearch = useCallback(
    debounce((searchTerm) => {
      updateDeepSearch(searchTerm);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    updateQuickSearch(searchTerm);
    debouncedUpdateDeepSearch(searchTerm);
  };

  return (
    <div className={styles.container}>
      <label>
        <input
          type="text"
          className={styles["search-bar"]}
          placeholder="Search"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default SearchBar;
