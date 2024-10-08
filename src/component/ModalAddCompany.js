import style from "../css/ModalAddCompany.module.css";
import mdClose from "../asset/images/ic_modalClose.png";
import { useEffect, useState } from "react";
import { getCompareList } from "../api/CompareAPI.js";
import SPagination from "./SPagination.js";
import AddCompanyList from "./AddCompanyList.js";
import AddSearchResult from "./AddSeachResult.js";
import Search from "./Search.js";

function ModalAddCompany({
  isOpen,
  onClose,
  onSelectAddCompany,
  prevSelectedCompany,
  selectedMyCompany,
  onRemoveCompany,
  errorMessage,
  setErrorMessage,
}) {
  const [searchData, setSearchData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState([]); //선택한 기업 리스트

  const [search, setSearch] = useState("");

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
    } else if (selectedCompanies.length < ITEM_LIMIT) {
      setErrorMessage("");
    }

    setSelectedCompanies((prev) => [...prev, company]);
    onSelectAddCompany(company);
    setErrorMessage(""); // 선택 후 경고 메시지 초기화
  };

  // 검색 데이터 로드 (페이지네이션 필요)
  const handleLoadSearchData = async () => {
    try {
      const response = await getCompareList({
        limit: ITEM_LIMIT,
        search: search,
        page: currentPage,
        excludeId: selectedMyCompany.id,
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
    if (isOpen) {
      handleLoadSearchData(search, currentPage); // 페이지 변경 시 데이터 로드
    }
  }, [isOpen, search, currentPage]); // 의존성 배열에 currentPage

  const handleCloseModal = () => {
    onClose();
  };

  //선택리스트 삭제 및 초기화.
  const handleRemoveCompany = (company) => {
    onRemoveCompany(company);

    if (selectedCompanies.length === 1) {
      setSelectedCompanies([]); // 선택한 기업 리스트를 빈 배열로 초기화
    }
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
          <Search
            setSearch={setSearch}
            setCurrentPage={setCurrentPage}
            handleLoadSearchData={handleLoadSearchData}
            searchData={searchData}
            isList={false}
            isMine={false}
          />
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
                setCurrentPage={setCurrentPage}
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
