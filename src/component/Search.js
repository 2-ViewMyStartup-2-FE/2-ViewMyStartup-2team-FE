import { useState } from "react";
import style from "../css/Search.module.css";
import closeCircle from "../asset/images/ic_cloaseCircleSmall.png";
import searchIcon from "../asset/images/ic_search.png";

export default function Search({ setSearch, setCurrentPage, handleLoadSearchData, setSearchData, isList, isMine }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    if(inputValue){
      setCurrentPage(1);
      setSearch(inputValue);
    } else {
      if (!isList) {
        setSearchData([]);
      } else setSearch("");
    }
  };

  const handleClearInput = () => {
    setInputValue("");
    setCurrentPage(1);
    setSearch("");
    if (!isList && !isMine) {
      handleLoadSearchData();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value === "") {
      setSearch("");
    }
  }

  return (
    <div className={`${style.searchGroup} ${isList ? style.list : style.compare}`}>
      <img
        className= {`${style.searchIcon} ${isList ? style.list : style.compare}`}
        src={searchIcon}
        alt="ic_search_bt"
        onClick={handleSearchClick}
      />
      <input
        className={`${style.searchInput} ${isList ? style.list : style.compare}`}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="검색어를 입력해주세요"
      />
      {inputValue && (
        <img
          className={`${style.closeCircle} ${isList ? style.list : style.compare}`}
          src={closeCircle}
          alt="closeSmall_bt"
          onClick={handleClearInput}
        />
      )}
      
    </div>

    
  );
}
