import style from "../css/StartupPage.module.css";
import searchIcon from "../asset/images/ic_search.png";
import SortContent from "../component/SortContent.js";
import StartupList from "../component/StartupList.js";
import Pagination from "../component/SPagination.js";
import { useState, useEffect } from "react";
import { getStartupList } from "../api/StartupAPI.js";

const ITEM_LIMIT = 10; // 페이지 당 항목 수

export default function StartupPage() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [startupData, setStartupData] = useState([]); // 스타트업 데이터 상태 관리
  const [totalCount, setTotalCount] = useState(0); // 전체 데이터 수 상태 관리
  const sortOption = "list";
  const [sortType, setSortType] = useState("investmentHighest");
  const [search, setSearch] = useState("");
  // 검색어 입력을 임시로 담아두는 곳
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStartupList({
          page: currentPage,
          limit: ITEM_LIMIT,
          order: sortType,
          search: search,
        });

        if (response) {
          setStartupData(response.data);
          setTotalCount(response.totalCount);
          console.log(response.data, response.totalCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, sortType, search]);

  // 데이터 정렬 함수
  const sortData = (data, option) => {
    switch (option) {
      case "누적 투자금액 높은순":
        return setSortType("investmentHighest");
      case "누적 투자금액 낮은순":
        return setSortType("investmentLowest");
      case "매출액 높은순":
        return setSortType("revenueHighest");
      case "매출액 낮은순":
        return setSortType("revenueLowest");
      case "고용 인원 많은순":
        return setSortType("employeeHighest");
      case "고용 인원 적은순":
        return setSortType("employeeLowest");
      default:
        return data;
    }
  };

  const handleSelect = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSortType(selectedOption);
  };

  const handleSearchClick = () => {
    setSearch(temp);
  }

  // 정렬된 데이터
  const sortedData = sortData([...startupData], sortType);

  console.log(sortedData);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>현재 스타트업 목록</h1>
        <div className={style.searchSortGroup}>
          <div className={style.searchGroup}>
            <img className={style.searchIcon} src={searchIcon} alt="search" onClick={handleSearchClick} />
            <input
              className={style.search}
              value={temp}
              placeholder="검색어를 입력해주세요"
              onChange={(e) => setTemp(e.target.value)}
            />
          </div>
          <SortContent
            sortOption={sortOption}
            defaultOption={sortType}
            onSelect={handleSelect}
          />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.listHeader}>
          <div className={style.rank}>순위</div>
          <div className={style.company}>기업 명</div>
          <div className={style.compDetail}>기업 소개</div>
          <div className={style.category}>카테고리</div>
          <div className={style.category}>누적 투자 금액</div>
          <div className={style.category}>매출액</div>
          <div className={style.category}>고용 인원</div>
        </div>
        <div className={style.listBody}>
          <StartupList
            currentPage={currentPage}
            itemLimit={ITEM_LIMIT}
            data={sortedData}
            isStatusPage={false}
            isCompareStatus={false}
          />
        </div>
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
