import style from "../css/ModalCompany.module.css";
import mdClose from "../asset/images/ic_modalClose.png";
import { useEffect, useState } from "react";
import ManyChoiceCompany from "./ManychoiceCompany.js";
import SearchResult from "./SearchResult.js";
import { getCompareList } from "../api/CompareAPI.js";
import Pagination from "./Pagination.js";
import Search from "./Search.js";
import useFetchList from "../hooks/useFetchList.js";

function ModalMyCompany({ isOpen, onClose, onSelectCompany }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const ITEM_LIMIT = 5;

  const handleSelectCompany = (company) => {
    onSelectCompany(company);
    onClose();
  };

  //가장 선택 많이한 기업(페이지네이션 X)
  const { data: startupData } = useFetchList(
    getCompareList,
    1,
    "myCountHighest",
    "",
    null,
    ITEM_LIMIT
  );

  //전체데이터 로드 (페이지네이션 O)
  const { data: searchData, totalCount } = useFetchList(
    getCompareList,
    currentPage,
    "recent",
    search,
    null,
    ITEM_LIMIT
  );

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setCurrentPage(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <p className={style.modalFont}>나의기업 선택하기</p>
          <img src={mdClose} onClick={onClose} alt="modalClose_bt" />
        </div>
        <Search
          setSearch={setSearch}
          setCurrentPage={setCurrentPage}
          handleLoadSearchData={searchData}
          setSearchData={searchData}
          isList={false}
          isMine={true}
        />
        <ManyChoiceCompany
          itemLimit={ITEM_LIMIT}
          data={startupData}
          onSelect={handleSelectCompany}
        />
        <div className={style.searchHeader}>
          <p className={style.modalFont}>검색 결과{`(${totalCount})`}</p>
        </div>

        <SearchResult data={searchData} onSelect={handleSelectCompany} />

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
  );
}

export default ModalMyCompany;
