import style from "../css/ModalCompany.module.css";
import mdClose from "../asset/images/ic_modalClose.png";
import closeCircle from "../asset/images/ic_cloaseCircleSmall.png";
import search from "../asset/images/ic_search.png";
import { useEffect, useState } from "react";
import CompanyListItem from "./ManychoiceCompany.js";
import SearchResult from "./SearchResult.js";
import { requestGet } from "../api/api.js";
import ModalPagination from "./ModalPagination.js";

function ModalMyCompany({ isOpen, onClose }) {
  const [inputValue, setInputValue] = useState("");
  const [startupData, setStartupData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEM_LIMIT = 5;

  // 전체 데이터 로드 (페이지네이션 없음)
  const handleLoadFetchData = async () => {
    try {
      const response = await requestGet({ limit: ITEM_LIMIT });
      if (response) {
        const sortedData = response.data.data
          .sort((a, b) => b.myChosenCount - a.myChosenCount)
          .slice(0, ITEM_LIMIT);
        setStartupData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 검색 데이터 로드 (페이지네이션 필요)
  const handleLoadSearchData = async (searchTerm, page) => {
    try {
      const response = await requestGet({
        limit: ITEM_LIMIT,
        search: searchTerm,
        sort: "createdAt",
        page: page,
      });

      if (response && response.data) {
        setSearchData(response.data.data || []);
        setTotalCount(response.data.totalCount || 0);
      } else {
        console.error("Invalid response structure:", response);
        setSearchData([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleLoadFetchData();
    } else {
      setInputValue("");
      setStartupData([]);
      setSearchData([]);
      setTotalCount(0);
      setCurrentPage(1);
    }
  }, [isOpen]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue(""); // 입력값 초기화
    setSearchData([]); // 검색 데이터 초기화
    setCurrentPage(1); // 현재 페이지를 1로 초기화
    setTotalCount(0);
  };

  const handleSearchClick = () => {
    if (inputValue) {
      setCurrentPage(1);
      handleLoadSearchData(inputValue, 1);
    } else {
      setSearchData([]);
    }
  };
  const handleKeyDown = (event) => {
    // 엔터 키 이벤트 추가
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  // 검색 결과 페이지 변경 시 데이터 로드
  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleLoadSearchData(inputValue, page);
  };

  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <p className={style.modalFont}>나의기업 선택하기</p>
          <img src={mdClose} onClick={onClose} alt="modalClose_bt" />
        </div>
        <div className={style.inputContainer}>
          <input
            className={style.modalInput}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
          />
          {inputValue && (
            <img
              className={style.closeCircle}
              src={closeCircle}
              alt="closeSmall_bt"
              onClick={handleClearInput}
            />
          )}
          <img
            className={style.searchButton}
            src={search}
            alt="ic_search_bt"
            onClick={handleSearchClick}
          />
        </div>
        <CompanyListItem itemLimit={ITEM_LIMIT} data={startupData} />
        <div className={style.searchHeader}>
          <p className={style.modalFont}>검색 결과{`(${totalCount})`}</p>
        </div>
        {searchData.length === 0 ? (
          <p>비교하고 싶은 기업을 검색해 주세요</p>
        ) : (
          <SearchResult data={searchData} />
        )}
        {totalCount > ITEM_LIMIT &&
          searchData.length > 0 && ( // 검색 데이터가 있을 때만 페이지네이션 표시
            <ModalPagination
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
              totalCount={totalCount}
              itemLimit={ITEM_LIMIT}
            />
          )}
      </div>
    </div>
  );
}

export default ModalMyCompany;
