import img_logo from "../asset/images/img_logo.png";
import { Link, useLocation } from "react-router-dom";
import style from "../css/Nav.module.css";

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isCompare = currentPath === "/compare";
  const isCompareStatus = currentPath === "/compare-status";
  const isInvestStatus = currentPath === "/invest-status";

  return (
    <div className={style.header}>
      <div className={style.nav}>
        <img className={style.logo} src={img_logo} alt="logo" />
        <div className={style.titleGroup}>
          <Link
            className={`${style.title} ${isCompare ? "active" : ""}`}
            to="/compare"
          >
            나의 기업 비교
          </Link>
          <Link
            className={`${style.title} ${isCompareStatus ? "active" : ""}`}
            to="/compare-status"
          >
            비교 현황
          </Link>
          <Link
            className={`${style.title} ${isInvestStatus ? "active" : ""}`}
            to="/invest-status"
          >
            투자 현황
          </Link>
        </div>
      </div>
    </div>
  );
}
