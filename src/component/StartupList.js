import style from "../css/StartupList.module.css";
import ConvertBillion from "../utils/ConvertBillion.js";
import defaultImg from "../asset/images/img_company_default_logo.png";


function StartupList({ currentPage, itemLimit, data, isStatusPage, isCompareStatus }) {
  const startIndex = (currentPage - 1) * itemLimit; // 현재 페이지의 시작 인덱스
  // const endIndex = startIndex + itemLimit; // 현재 페이지의 끝 인덱스

  // const sortedData = data.map((item) => ({
  //   ...item,
  //   total: item.investment + item.revenue
  // })).sort((a, b) => b.total - a.total);

  // const visibleData = sortedData.slice(startIndex, endIndex);
  // console.log(isStatusPage);

  return (
    <div className={style.table}>
      {data.map((item, index) => (
        <div key={index} className={style.listItem}>
          <div className={style.rank}>{startIndex + index + 1}</div>
          <div className={style.company}>
            <img className={style.logo} src={item.logo === "" ? defaultImg : item.logo} alt="logo" />
            <div className={style.companyName}>{item.name}</div>
          </div>
          <div className={style.description}>{item.description}</div>
          <div className={style.category}>{item.category}</div>
          <div className={`${style.investment} ${isStatusPage ? style.status : ""}`}>
            {!isStatusPage ? ConvertBillion(parseInt(item.actualInvestAmount)) : (!isCompareStatus ? ConvertBillion(parseInt(item.simulatedInvestAmount)) : item.myChosenCount)} 
          </div>
          <div className={`${style.revenue} ${isStatusPage ? style.status : ""}`} >
            {!isStatusPage ? ConvertBillion(parseInt(item.revenue)) : (!isCompareStatus ? ConvertBillion(parseInt(item.actualInvestAmount)) : item.comparedChosenCount)} 
          </div>
          {!isStatusPage && (
            <div className={style.employee}>{item.employee}명</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default StartupList;
