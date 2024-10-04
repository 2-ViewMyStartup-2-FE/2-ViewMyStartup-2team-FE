import style from "../css/ModalAddCompany.module.css";
import mdClose from "../asset/images/ic_modalClose.png";
import closeCircle from "../asset/images/ic_cloaseCircleSmall.png";
import search from "../asset/images/ic_search.png";
import { useEffect, useState } from "react";
import { getCompareList } from "../api/CompareAPI.js";
import SPagination from "./SPagination.js";
import AddCompanyList from "./AddCompanyList.js";
import AddSearchResult from "./AddSeachResult.js";

function ModalAddCompany({ isOpen, onClose, onSelectAddCompany, prevSelectedCompany }) {
  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState([]); //선택한 기업 리스트
  const [errorMessage, setErrorMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const ITEM_LIMIT = 5;

  useEffect(() => {
    if (isOpen && prevSelectedCompany?.length > 0) {
      setSelectedCompanies(prevSelectedCompany);
    }
  }, [isOpen, prevSelectedCompany]);

  const handleSelectCompany = (company) => {
    if (selectedCompanies.length >= ITEM_LIMIT) {
      setErrorMessage("*최대 5개까지만 선택 가능합니다."); // 경고 메시지 설정
      return; // 선택을 중지
    }

    setSelectedCompanies((prev) => [...prev, company]);
    onSelectAddCompany(company);
    setErrorMessage(""); // 선택 후 경고 메시지 초기화
  };

  //선택 해제 버튼 핸들러
  const handleRemoveCompany = (id) => {
    setSelectedCompanies((prev) => {
      const updatedCompanies = prev.filter((company) => company.id !== id);
      // 에러 메시지 초기화 조건
      if (updatedCompanies.length < ITEM_LIMIT) {
        setErrorMessage(""); // 선택 기업 수가 ITEM_LIMIT 미만일 때 에러 메시지 초기화
      }
      return updatedCompanies;
    });
  };

  // 검색 데이터 로드 (페이지네이션 필요)
  const handleLoadSearchData = async (searchTerm = "", page = 1) => {
    try {
      const response = await getCompareList({
        limit: ITEM_LIMIT,
        search: searchTerm,
        page: page,
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
  };

  useEffect(() => {
    if (isOpen && !dataLoaded) {
      handleLoadSearchData();
      setDataLoaded(true);
    }
  }, [isOpen, dataLoaded]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (!value) {
      handleLoadSearchData();
    }
  };

  const handleClearInput = () => {
    setInputValue(""); // 입력값 초기화
    setCurrentPage(1); // 현재 페이지를 1로 초기화
    handleLoadSearchData();
  };

  const handleSearchClick = () => {
    if (inputValue) {
      setCurrentPage(1);
      handleLoadSearchData(inputValue, 1);
    } else {
      setSearchData([]);
    }
  };

  // 엔터 키 이벤트 추가
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  // 검색 결과 페이지 변경 시 데이터 로드
  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleLoadSearchData(inputValue, page);
  };

  const handleCloseModal = () => {
    onClose();
    // setDataLoaded(false); // 모달이 닫힐 때 dataLoaded 상태를 초기화
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={style.modal}>
        <div className={style.modalContent}>
          <div className={style.modalHeader}>
            <p className={style.modalFont}>비교할 기업</p>
            <img src={mdClose} onClick={handleCloseModal} alt="modalClose_bt" />
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
          <div className={style.searchHeader}>
            <p className={style.modalFont}>
              선택한 기업{`(${selectedCompanies.length})`}
            </p>
          </div>
          <AddCompanyList
            selectedCompanies={selectedCompanies}
            onRemoveCompany={handleRemoveCompany}
          />

          <div className={style.searchHeader}>
            <p className={style.modalFont}>검색 결과{`(${totalCount})`}</p>
          </div>
          <AddSearchResult
            data={searchData}
            onSelect={handleSelectCompany}
            selectedCompanies={selectedCompanies}
          />

          {errorMessage && <p className={style.errorText}>{errorMessage}</p>}
          {/*에러메세지 위치 고정*/}

          {totalCount > ITEM_LIMIT &&
            searchData.length > 0 && ( // 검색 데이터가 있을 때만 페이지네이션 표시
              <SPagination
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                totalCount={totalCount}
                itemLimit={ITEM_LIMIT}
                className={style.modalPage}
              />
            )}
        </div>
      </div>
    </>
  );
}

export default ModalAddCompany;
