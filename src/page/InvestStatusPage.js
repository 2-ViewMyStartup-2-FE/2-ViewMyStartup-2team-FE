import { useState } from "react";
import StartupList from "../component/StartupList";
import style from "../css/InvestStatusPage.module.css";
import startupData from "../api/mock.js";
import SPagination from "../component/SPagination.js";
import SortContent from "../component/SortContent.js";

const ITEM_LIMIT = 10;

export default function InvestStatusPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const sortOption = "invest";
  const [sortType, setSortType] = useState("View My Startup 투자 금액 높은순");
  const totalCount = startupData.length;

  // 데이터 정렬 함수
  const sortData = (data, option) => {
    switch (option) {
      case "View My Startup 투자 금액 높은순":
        return data.sort((a, b) => b.investment - a.investment);
      case "View My Startup 투자 금액 낮은순":
        return data.sort((a, b) => a.investment - b.investment);
      case "실제 누적 투자 금액 높은순":
        return data.sort((a, b) => b.revenue - a.revenue);
      case "실제 누적 투자 금액 낮은순":
        return data.sort((a, b) => a.revenue - b.revenue);
      default:
        return data;
    }
  };

  const handleSelect = (selectedOption) => {
    // console.log("Selected option:", selectedOption);
    setSortType(selectedOption);
  };

  const sortedData = sortData([...startupData], sortType);

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
        <div className={style.listHeader}>
          <div className={style.rank}>순위</div>
          <div className={style.company}>기업 명</div>
          <div className={style.compDetail}>기업 소개</div>
          <div className={style.category}>카테고리</div>
          <div className={style.other}>View My Startup 투자 금액</div>
          <div className={style.other}>실제 누적 투자 금액</div>
        </div>
        <StartupList
          currentPage={currentPage}
          itemLimit={ITEM_LIMIT}
          data={sortedData}
          isStatusPage={true}
        />
      </div>
      <SPagination
        currentPage={currentPage} // 현재 페이지 번호
        setCurrentPage={setCurrentPage}
        totalCount={totalCount} // 전체 데이터 수
        itemLimit={ITEM_LIMIT}
      />
    </div>
  );
}
