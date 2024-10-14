import style from "../css/StartupPage.module.css";
import SortContent from "../component/SortContent.js";
import Pagination from "../component/Pagination.js";
import Search from "../component/Search.js";
import { useState } from "react";
import { getStartupList } from "../api/StartupAPI.js";
import useFetchList from "../hooks/useFetchList.js";
import CompanyInfoTable from "../component/CompanyInfoTable.js";

const ITEM_LIMIT = 10; // 페이지 당 항목 수

export default function StartupPage() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [sortType, setSortType] = useState("investmentHighest");
  const [search, setSearch] = useState("");
  const { data: startupData, totalCount } = useFetchList(getStartupList, currentPage, sortType, search);
  const sortOption = "list";

  const handleSelect = (selectedOption) => {
    setSortType(selectedOption);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>현재 스타트업 목록</h1>
        <div className={style.searchSortGroup}>
          <Search
            setSearch={setSearch}
            setCurrentPage={setCurrentPage}
            isList={true}
          />
          <SortContent
            sortOption={sortOption}
            defaultOption={sortType}
            onSelect={handleSelect}
          />
        </div>
      </div>
      <div className={style.body}>
            <CompanyInfoTable 
              list={startupData}
            />
        <div className={style.pagination}>
          <Pagination
            currentPage={currentPage} // 현재 페이지 번호
            setCurrentPage={setCurrentPage}
            totalCount={totalCount} // 전체 데이터 수
            itemLimit={ITEM_LIMIT} // 페이지 당 항목 수
          />
        </div>
      </div>
    </div>
  );
}
