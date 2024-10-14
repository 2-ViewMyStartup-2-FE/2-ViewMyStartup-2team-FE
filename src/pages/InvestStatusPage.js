import { useState } from "react";
import { getInvestmentList } from "../api/InvestStatusAPI.js";
import style from "../css/InvestStatusPage.module.css";
import Pagination from "../component/Pagination.js";
import SortContent from "../component/SortContent.js";
import useFetchList from "../hooks/useFetchList.js";
import CompanyInfoTable from "../component/CompanyInfoTable.js";

const ITEM_LIMIT = 10;

export default function InvestStatusPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("simulatedInvestHighest");
  const sortOption = "invest";
  const { data: investmentData, totalCount } = useFetchList(
    getInvestmentList,
    currentPage,
    sortType
  );

  const handleSelect = (selectedOption) => {
    setSortType(selectedOption);
  };

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
        <CompanyInfoTable type="investmentStatus" list={investmentData} />
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
