import { useNavigate } from "react-router-dom";
import style from "../css/StartupList.module.css";
import ConvertBillion from "../utils/ConvertBillion.js";
import defaultImg from "../asset/images/img_company_default_logo.png";


function StartupList({ currentPage, itemLimit, data, isStatusPage, isCompareStatus }) {
  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * itemLimit; // 현재 페이지의 시작 인덱스

  const handleItemClick = (id) => {
    navigate(`/companies/${id}`);
  };

  return (
    <div className={style.table}>
      {data.map((item, index) => (
        <div key={index} className={style.listItem} onClick={() => handleItemClick(item.id)}>
          <div className={style.rank}>{startIndex + index + 1}위</div>
          <div className={style.company}>
            <img className={style.logo} src={item.logo === "" ? defaultImg : item.logo} alt="logo" onError={(e) => e.target.src = defaultImg}/>
            <div className={style.companyName}>{item.name}</div>
          </div>
          <div className={style.description}>{item.description}</div>
          <div className={style.category}>{item.category}</div>
          <div className={`${style.investment} ${isStatusPage ? style.status : ""}`}>
            {!isStatusPage ? ConvertBillion(parseInt(item.totalInvestment)) : (!isCompareStatus ? ConvertBillion(parseInt(item.virtualInvestment)) : item.myChosenCount)} 
          </div>
          <div className={`${style.revenue} ${isStatusPage ? style.status : ""}`} >
            {!isStatusPage ? ConvertBillion(parseInt(item.revenue)) : (!isCompareStatus ? ConvertBillion(parseInt(item.actualInvestment)) : item.comparedChosenCount)} 
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
