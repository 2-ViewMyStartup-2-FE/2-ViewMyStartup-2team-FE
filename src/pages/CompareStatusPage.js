import { useState } from "react";
import style from "../css/InvestStatusPage.module.css";
import { getCountList } from "../api/CompareStatusAPI.js";
import Pagination from "../component/Pagination.js";
import SortContent from "../component/SortContent.js";
import useFetchList from "../hooks/useFetchList.js";
import CompanyInfoTable from "../component/CompanyInfoTable.js";

const ITEM_LIMIT = 10;

export default function CompareStatusPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("myCountHighest");
  const sortOption = "compare";
  const { data: item, totalCount } = useFetchList(getCountList, currentPage, sortType);

  const handleSelect = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSortType(selectedOption);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>비교 현황</h1>
        <SortContent
          sortOption={sortOption}
          defaultOption={sortType}
          onSelect={handleSelect}
        />
      </div>
      <div className={style.body}>
        <CompanyInfoTable 
          type="compareStatus"
          list={item}
        />
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
