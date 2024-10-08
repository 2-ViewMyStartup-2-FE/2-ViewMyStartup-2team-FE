import style from "../css/ModalCompany.module.css";
import mdClose from "../asset/images/ic_modalClose.png";
import Search from "./Search.js";
import { useEffect, useState } from "react";
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

  const ITEM_LIMIT = 5;

  const handleSelectCompany = (company) => {
    //선택시 Compare화면에 나타남
    onSelectCompany(company);
    onClose(); //모달 닫기
  };

  // 전체 데이터 로드 (페이지네이션 없음)
  const handleLoadFetchData = async () => {
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
  };

  // 검색 데이터 로드 (페이지네이션 필요)
  const handleLoadSearchData = async (searchTerm, page) => {
    try {
      const response = await getCompareList({
        limit: ITEM_LIMIT,
        search: searchTerm,
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
  };

  useEffect(() => {
    if (isOpen) {
      handleLoadFetchData();
      handleLoadSearchData(inputValue, currentPage);
    } else {
      setInputValue("");
      setStartupData([]);
      setSearchData([]);
      setTotalCount(0);
      setCurrentPage(1);
    }
  }, [isOpen, currentPage]);

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
        <Search 
          setCurrentPage={setCurrentPage} 
          handleLoadSearchData={handleLoadSearchData} 
          setSearchData={setSearchData} 
          isList={false} />
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
              setCurrentPage={handlePageChange}
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
