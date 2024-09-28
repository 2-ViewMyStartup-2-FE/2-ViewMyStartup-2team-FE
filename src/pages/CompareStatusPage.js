import style from "../css/StartupPage.module.css";
import RankSort from "../component/ListSort";
import StartupList from "../component/StartupList";
import Pagination from "../component/SPagination.js";
import { useState, useEffect } from "react";
import { getStartupList } from "../api/StartupAPI.js";

const ITEM_LIMIT = 10; // 페이지 당 항목 수

export default function StartupPage() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [startupData, setStartupData] = useState([]); // 스타트업 데이터 상태 관리
  const [totalCount, setTotalCount] = useState(0); // 전체 데이터 수 상태 관리

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

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>투자 현황</h1>
        <div className={style.searchSortGroup}>
          <RankSort />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.listHeader}>
          <div className={style.rank}>순위</div>
          <div className={style.company}>기업 명</div>
          <div className={style.compDetail}>기업 소개</div>
          <div className={style.category}>카테고리</div>
          <div className={style.category}>나의 기업 선택 횟수</div>
          <div className={style.category}>비교 기업 선택 횟수</div>
        </div>
        <div className={style.listBody}>
          <StartupList
            currentPage={currentPage}
            itemLimit={ITEM_LIMIT}
            data={startupData}
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
