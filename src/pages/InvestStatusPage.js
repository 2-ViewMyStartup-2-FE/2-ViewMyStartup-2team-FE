import { useState, useEffect } from "react";
import { getInvestmentList } from "../api/InvestStatusAPI.js";
import StartupList from "../component/StartupList.js";
import style from "../css/InvestStatusPage.module.css";
import Pagination from "../component/Pagination.js";
import SortContent from "../component/SortContent.js";

const ITEM_LIMIT = 10;

export default function InvestStatusPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [investmentData, setInvestmentData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const sortOption = "invest";
  const [sortType, setSortType] = useState("simulatedInvestHighest");
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInvestmentList({
          page: currentPage,
          limit: ITEM_LIMIT,
          order: sortType,
        });

        if (response) {
          setInvestmentData(response.data);
          setTotalCount(response.totalCount);
          console.log(response.data, response.totalCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, sortType]);

    
  // 데이터 정렬 함수
  const sortData = (data, option) => {
    switch (option) {
      case "View My Startup 투자 금액 높은순":
        return setSortType("virtualInvestHighest");
      case "View My Startup 투자 금액 낮은순":
        return setSortType("virtualInvestLowest");
      case "실제 누적 투자 금액 높은순":
        return setSortType("actualInvestHighest");
      case "실제 누적 투자 금액 낮은순":
        return setSortType("actualInvestLowest");
      default:
        return data;
    }
  };

  const handleSelect = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSortType(selectedOption);
  };

  const sortedData = sortData([...investmentData], sortType);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>투자 현황</h1>
        <SortContent
          sortOption={sortOption}
          defaultOption={sortType}
          onSelect={handleSelect}
        />
      </div>
      <div className={style.body}>
        <div className={style.table}>
        <div className={style.listHeader}>
          <div className={style.rank}>순위</div>
          <div className={style.company}>기업 명</div>
          <div className={style.description}>기업 소개</div>
          <div className={style.category}>카테고리</div>
          <div className={style.other}>View My Startup {windowSize < 1000 && <br />}투자 금액</div>
          <div className={style.other}>실제 누적 투자 금액</div>
        </div>
        <StartupList
          currentPage={currentPage}
          itemLimit={ITEM_LIMIT}
          data={sortedData}
          isStatusPage={true}
          isCompareStatus={false}
        />
      </div>
      </div>
      <Pagination
        currentPage={currentPage} // 현재 페이지 번호
        setCurrentPage={setCurrentPage}
        totalCount={totalCount} // 전체 데이터 수
        itemLimit={ITEM_LIMIT}
      />
    </div>
  );
}
