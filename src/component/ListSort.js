import { useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import toggle from "../asset/images/ic_toggle.png";
import style from "../css/ListSort.module.css";

export default function ListSort({ options, defaultOption, onSelect }) {
  const [isToggle, setToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const location = useLocation();
  const isList = location.pathname === "/";
  const isCompareResult = location.pathname === "/compare-result";

  const toggleSortMenu = () => setToggle(!isToggle);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option); // 부모 컴포넌트에 선택된 옵션 전달
    setToggle(false); // 메뉴 닫기
  };

  return (
    <div className={style.sortMenu}>
      <button
        className={`${style.sortButton} ${!isList ? style.status : ""} ${
          isCompareResult ? style.compareResult : ""
        }`}
        onClick={toggleSortMenu}
      >
        <div className={style.sortContext}>{selectedOption}</div>
        <img src={toggle} alt="toggle" />
      </button>
      {isToggle && (
        <div
          className={`${style.sortOptions} ${
            isCompareResult ? style.compareResult : !isList ? style.status : ""
          }`}
        >
          {options.map((option, index) => (
            <Fragment key={index}>
              <button
                className={`${style.sortToggle} ${
                  isCompareResult
                    ? style.compareResult
                    : !isList
                    ? style.status
                    : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
              {index < options.length - 1 && <span className={style.span} />}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
