import { useEffect, useState } from "react";
import YStartupList from "../component/YStartupList.js";
import style from "../css/InvestStatusPage.module.css";
import { getCountList } from "../api/CompareStatusAPI.js";
import SPagination from "../component/SPagination.js";
import SortContent from "../component/SortContent.js";

const ITEM_LIMIT = 10;

export default function InvestStatusPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [item, setItem] = useState([]);
  const sortOption = "compare";
  const [sortType, setSortType] = useState("myCountHighest");
  const totalCount = 20; // backend에서 total count 받는 함수 추가 후 수정 필요

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCountList(currentPage, ITEM_LIMIT, sortType);
      setItem(res);
    };

    fetchData();
  }, [currentPage, sortType]);

  //데이터 정렬 함수
  const sortData = (data, option) => {
    switch (option) {
      case "나의 기업 선택 횟수 높은순":
        return setSortType("myCountHighest");
      case "나의 기업 선택 횟수 낮은순":
        return setSortType("myCountLowest");
      case "비교 기업 선택 횟수 높은순":
        return setSortType("comparedHighest");
      case "비교 기업 선택 횟수 낮은순":
        return setSortType("comparedLowest");
      default:
        return data;
    }
  };

  const handleSelect = (selectedOption) => {
    // console.log("Selected option:", selectedOption);
    setSortType(selectedOption);
  };

  const sortedData = sortData([...item], sortType);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>비교 현황</h1>
        <SortContent
          sortOption={sortOption}
          defaultOption={sortedData}
          onSelect={handleSelect}
        />
      </div>
      <div className={style.body}>
        <div className={style.listHeader}>
          <div className={style.rank}>순위</div>
          <div className={style.company}>기업 명</div>
          <div className={style.compDetail}>기업 소개</div>
          <div className={style.category}>카테고리</div>
          <div className={style.other}>나의 기업 선택 횟수</div>
          <div className={style.other}>비교 기업 선택 횟수</div>
        </div>
        <YStartupList
          currentPage={currentPage}
          itemLimit={ITEM_LIMIT}
          data={item}
          isStatusPage={true}
          isCompareStatus={true}
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
