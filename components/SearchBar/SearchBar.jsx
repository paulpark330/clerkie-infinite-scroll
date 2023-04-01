import { FilterContext } from "@/store/filter-context";
import { useContext } from "react";
import styles from "./SearchBar.module.scss";
import debounce from "@/lib/debounce";

const SearchBar = () => {
  const { updateSearchTerms, updateLiveTerms } = useContext(FilterContext);

  const handleDebounceChange = debounce((searchTerm) => {
    updateSearchTerms(searchTerm);
  }, 500);

  const handleLiveChange = (searchTerm) => {
    updateLiveTerms(searchTerm);
  };

  const handleChange = (e) => {
    handleLiveChange(e.target.value);
    handleDebounceChange(e.target.value);
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
