import style from "../css/StartupPage.module.css";
import search from "../asset/images/ic_search.png";
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
  const [sortType, setSortType] = useState("누적 투자금액 높은순");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStartupList();

        if (response) {
          setStartupData(response.data);
          setTotalCount(response.totalCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 데이터 정렬 함수
  const sortData = (data, option) => {
    const dataCopy = data.slice();
    switch (option) {
      case "누적 투자금액 높은순":
        return dataCopy.sort((a, b) => b.investment - a.investment);
      case "누적 투자금액 낮은순":
        return dataCopy.sort((a, b) => a.investment - b.investment);
      case "매출액 높은순":
        return dataCopy.sort((a, b) => b.revenue - a.revenue);
      case "매출액 낮은순":
        return dataCopy.sort((a, b) => a.revenue - b.revenue);
      case "고용 인원 많은순":
        return dataCopy.sort((a, b) => b.employee - a.employee);
      default:
        return data;
    }
  };

  const handleSelect = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSortType(selectedOption);
  };

  // 정렬된 데이터
  const sortedData = sortData([...startupData], sortType);

  console.log(sortedData);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>현재 스타트업 목록</h1>
        <div className={style.searchSortGroup}>
          <div className={style.searchGroup}>
            <img className={style.searchIcon} src={search} alt="search" />
            <input
              className={style.search}
              placeholder="검색어를 입력해주세요"
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
          <div className={style.description}>기업 소개</div>
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
