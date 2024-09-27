import { useState } from "react";
import toggle from "../asset/images/ic_toggle.png";
import style from "../css/ListSort.module.css";

export default function ListSort() {
  const [isToggle, setToggle] = useState(false);

  const toggleSortMenu = () => setToggle(!isToggle);
  return (
    <div className={style.sortMenu}>
      <button className={style.sortButton} onClick={toggleSortMenu}>
        <div className={style.sortContext}>매출액 높은 순</div>
        <img src={toggle} alt="toggle" />
      </button>
      {isToggle && (
        <div className={style.sortOptions}>
          <button className={`${style.sortToggle} ${style.top}`}>
            누적 투자금액 높은순
          </button>
          <span />
          <button className={style.sortToggle}>누적 투자금액 낮은순</button>
          <span />
          <button className={style.sortToggle}>매출액 높은순</button>
          <span />
          <button className={style.sortToggle}>매출액 낮은순</button>
          <span />
          <button className={style.sortToggle}>고용 인원 많은순</button>
          <span />
          <button className={`${style.sortToggle} ${style.top}`}>
            고용 인원 적은순
          </button>
        </div>
      )}
    </div>
  );
}
