import style from "../css/ModalAddCompany.module.css";
import mdClose from "../asset/images/ic_modalClose.png";
import { useEffect, useState, useCallback } from "react";
import { getCompareList } from "../api/CompareAPI.js";
import Pagination from "./Pagination.js";
import AddCompanyList from "./AddCompanyList.js";
import AddSearchResult from "./AddSeachResult.js";
import Search from "./Search.js";

const ITEM_LIMIT = 5;

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
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen && prevSelectedCompany?.length > 0) {
      setSelectedCompanies(prevSelectedCompany);
    }
  }, [isOpen, prevSelectedCompany]);

  const handleSelectCompany = (company) => {
    if (selectedCompanies.length >= ITEM_LIMIT) {
      setErrorMessage("*최대 5개까지만 선택 가능합니다.");
      return;
    } else if (selectedCompanies.length < ITEM_LIMIT) {
      setErrorMessage("");
    }

    setSelectedCompanies((prev) => [...prev, company]);
    onSelectAddCompany(company);
    setErrorMessage("");
  };

  // 검색 데이터 로드 (페이지네이션 필요)
  const handleLoadSearchData = useCallback(async () => {
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
  }, [search, currentPage, selectedMyCompany.id]);

  useEffect(() => {
    if (isOpen) {
      handleLoadSearchData();
    }
  }, [isOpen, handleLoadSearchData]);

  const handleCloseModal = () => {
    onClose();
  };

  //선택리스트 삭제 및 초기화.
  const handleRemoveCompany = (company) => {
    onRemoveCompany(company);

    if (selectedCompanies.length === 1) {
      setSelectedCompanies([]);
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

          {totalCount > ITEM_LIMIT && searchData.length > 0 && (
            <Pagination
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
