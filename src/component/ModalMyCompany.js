import style from "../css/ModalCompany.module.css";
import mdClose from "../asset/images/ic_modalClose.png";
import closeCircle from "../asset/images/ic_cloaseCircleSmall.png";
import searchIcon from "../asset/images/ic_search.png";
import { useEffect, useState, useCallback } from "react";
import ManyChoiceCompany from "./ManychoiceCompany.js";
import SearchResult from "./SearchResult.js";
import { getCompareList } from "../api/CompareAPI.js";
import SPagination from "./SPagination.js";

function ModalMyCompany({ isOpen, onClose, onSelectCompany }) {
  const [inputValue, setInputValue] = useState("");
  const [startupData, setStartupData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const ITEM_LIMIT = 5;

  const handleSelectCompany = (company) => {
    //선택시 Compare화면에 나타남
    onSelectCompany(company);
    onClose(); //모달 닫기
  };

  // 전체 데이터 로드 (페이지네이션 없음)
  const handleLoadFetchData = useCallback(async () => {
    try {
      const response = await getCompareList({ limit: ITEM_LIMIT });
      if (response) {
        const sortedData = response.data.sort(
          (a, b) => b.myChosenCount - a.myChosenCount
        );
        setStartupData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []); // 의존성 배열이 비어 있음

  // 검색 데이터 로드 (페이지네이션 필요)
  const handleLoadSearchData = useCallback(async () => {
    try {
      const response = await getCompareList({
        limit: ITEM_LIMIT,
        search: search,
        page: currentPage,
      });

      if (response && response.data) {
        setSearchData(response.data || []);
        setTotalCount(response.totalCount || 0);
      } else {
        console.error("Invalid response structure:", response);
        setSearchData([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [search, currentPage]); // 의존성 배열에 search와 currentPage 추가

  useEffect(() => {
    if (isOpen) {
      handleLoadFetchData(); // 전체 데이터 로드
      handleLoadSearchData(); // 검색 데이터 로드
    } else {
      // 모달이 닫힐 때 상태 초기화
      setInputValue("");
      setStartupData([]);
      setSearchData([]);
      setTotalCount(0);
      setCurrentPage(1);
    }
  }, [isOpen, handleLoadFetchData, handleLoadSearchData]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value === "") {
      setSearch("");
    }
  };

  const handleClearInput = () => {
    setInputValue(""); // 입력값 초기화
    setSearch("");
    setCurrentPage(1); // 현재 페이지를 1로 초기화
  };

  const handleSearchClick = () => {
    if (inputValue) {
      setCurrentPage(1);
      setSearch(inputValue);
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
            src={searchIcon}
            alt="ic_search_bt"
            onClick={handleSearchClick}
          />
        </div>
        <ManyChoiceCompany
          itemLimit={ITEM_LIMIT}
          data={startupData}
          onSelect={handleSelectCompany}
        />
        <div className={style.searchHeader}>
          <p className={style.modalFont}>검색 결과{`(${totalCount})`}</p>
        </div>

        <SearchResult data={searchData} onSelect={handleSelectCompany} />

        {totalCount > ITEM_LIMIT &&
          searchData.length > 0 && ( // 검색 데이터가 있을 때만 페이지네이션 표시
            <SPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalCount={totalCount}
              itemLimit={ITEM_LIMIT}
              className={style.modalPage}
            />
          )}
      </div>
    </div>
  );
}

export default ModalMyCompany;
