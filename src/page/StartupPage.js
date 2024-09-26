import style from "../css/StartupPage.module.css";
import search from "../asset/image/ic_search.png";
import RankSort from "../component/ListSort";
import StartupList from "../component/StartupList";
import Pagination from "../component/SPagination.js";
import { useState } from "react";
import startupData from "../api/mock.js";

export default function StartupPage() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const totalCount = startupData.length;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>현재 스타트업 목록</h1>
        <div className={style.searchSortGroup}>
          <div className={style.searchGroup}>
            <img className={style.searchIcon} src={search} alt="search" />
            <input
              className={style.search}
              placeholder="검색어를 입력해주세요" />
          </div>
          <RankSort />
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
            data={startupData} />
        </div>
        <div className={style.pagination}>
          <Pagination 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          totalCount={totalCount} />
        </div>
      </div>
    </div>
  );
}
