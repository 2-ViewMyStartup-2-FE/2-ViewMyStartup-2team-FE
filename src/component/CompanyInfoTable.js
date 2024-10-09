import styles from "../css/CompanyInfoTable.module.css";
import { Link } from "react-router-dom";
import ConvertBillion from "../utils/ConvertBillion.js";
import defaultLogo from "../asset/images/img_company_default_logo.png";
function CompanyInfoTable({
  type = "standard",
  list,
  highLightId = "",
  className = ""
}) {
  const isTablet = window.innerWidth <= 1199;
  const isCompareResult = type === "compareResult";
  const isCompareStatus = type === "compareStatus";
  const isInvestment = type === "investmentStatus";
  const selectClass = (element) => {
    const result = isCompareResult
      ? `${element} : ${styles.compareResult}`
      : isCompareStatus
      ? `${element} ${styles.compareStatus}`
      : isInvestment
      ? `${element} : ${styles.investmentStatus}`
      : `${element} ${styles.standard}`;
    return result;
  };
  const selectMenuName = () => {
    const pcMessage = "View My Startup 투자 금액";
    const tabletMessage = (
      <>
        View My Startup
        <br />
        투자 금액
      </>
    );
    const result = isCompareStatus
      ? ["나의 기업 선택 횟수", "비교 기업 선택 횟수"]
      : isInvestment
      ? [isTablet ? tabletMessage : pcMessage, "실제 누적 투자 금액"]
      : ["누적 투자 금액", "매출액", "고용 인원"];
    return result;
  };
  const selectMenuNames = selectMenuName();
  const handleError = (e) => (e.target.src = defaultLogo);
  const isHighLight = (company) =>
    company.id === highLightId ? styles.highLight : "";

  const seletedMenuValue = (company) => {
    const myChosenCount = company.myChosenCount;
    const comparedChosenCount = company.comparedChosenCount;
    const totalInvestment = `${ConvertBillion(company.totalInvestment)} 원`;
    const virtualInvestment = `${ConvertBillion(company.virtualInvestment)} 원`;
    const revenue = `${ConvertBillion(company.revenue)} 원`;
    const employee = company.employee;
    const result = isCompareStatus
      ? [myChosenCount, comparedChosenCount]
      : isInvestment
      ? [virtualInvestment, totalInvestment]
      : [totalInvestment, revenue, employee];
    return result;
  };
  const header = selectClass(styles.header);
  const row = selectClass(styles.row);
  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <div className={styles.table}>
        <div className={header}>
          {!isCompareResult && <div className={styles.cell}>순위</div>}
          <div className={styles.cell}>기업 명</div>
          <div className={styles.cell}>기업 소개</div>
          <div className={styles.cell}>카테고리</div>
          {selectMenuNames.map((menu, index) => (
            <div className={styles.cell} key={menu}>
              {menu}
            </div>
          ))}
        </div>
        {list.map((company) => (
          <Link
            to={`/companies/${company.id}`}
            className={styles.link}
            key={company.id}
          >
            <div className={`${row} ${isHighLight(company)}`}>
              {!isCompareResult && (
                <div className={styles.cell}>{company.rank}위</div>
              )}
              <div className={styles.nameAndLogo}>
                <img
                  className={styles.logo}
                  src={company.logo}
                  alt="회사 로고 이미지"
                  onError={handleError}
                />
                <div className={styles.name}>{company.name}</div>
              </div>
              <div className={styles.description}>{company.description}</div>
              <div className={styles.cell}>{company.category}</div>
              {seletedMenuValue(company).map((value) => (
                <div className={styles.cell} key={value}>
                  {value}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default CompanyInfoTable;
