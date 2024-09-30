import style from "../css/YStartupList.module.css";
import defaultImg from "../asset/images/img_company_default_logo.png";

function YStartupList({
  currentPage,
  itemLimit,
  data,
  isStatusPage,
  isCompareStatus,
}) {
  const startIndex = (currentPage - 1) * itemLimit; // 현재 페이지의 시작 인덱스

  return (
    <div className={style.table}>
      {data.map((item, index) => (
        <div key={index} className={style.listItem}>
          <div className={style.rank}>{startIndex + index + 1}</div>
          <div className={style.company}>
            <img
              className={style.logo}
              src={item.logoImage === "" ? defaultImg : item.logoImage}
              alt="logo"
            />
            <div className={style.companyName}>{item.name}</div>
          </div>
          <div className={style.compDetail}>{item.description}</div>
          <div className={style.category}>{item.category}</div>
          <div
            className={`${style.investment} ${
              isStatusPage ? style.status : ""
            }`}
          >
            {!isCompareStatus ? item.investment : item.myChosenCount}
            {!isCompareStatus ? "억 원" : ""}
          </div>
          <div
            className={`${style.revenue} ${isStatusPage ? style.status : ""}`}
          >
            {!isCompareStatus ? item.revenue : item.comparedChosenCount}
            {!isCompareStatus ? "억 원" : ""}
          </div>
          {!isStatusPage && (
            <div className={style.employees}>{item.employees}명</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default YStartupList;
