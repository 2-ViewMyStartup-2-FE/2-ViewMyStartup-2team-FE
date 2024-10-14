import styles from "../css/CompareResultPage.module.css";
import { useLocation } from "react-router-dom";
import MyCompanyCard from "../component/MyCompanyCard.js";
import InvestModal from "../component/InvestModal.js";
import InvestmentPopup from "../component/InvestmentPopup.js";
import { useState } from "react";
import { getRankAndNearbyCompanies } from "../api/CompareResultAPI.js";
import useFetchCompanyData from "../hooks/useFetchCompanyData.js";
import sortData from "../utils/sortData.js";
import CompanyInfoTable from "../component/CompanyInfoTable.js";
import SortContent from "../component/SortContent.js";
function CompareResultPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const myCompanyId = params.get("mycompany");
  const joinedSelectedCompanies = params.get("selectedcompany");
  const allSelectedCompaniesId = joinedSelectedCompanies.split(",");
  const selectedCompaniesId = allSelectedCompaniesId.filter(
    (id) => id !== myCompanyId
  );
  const { compStatus, setCompStatus, rankStatus, setRankStatus } =
    useFetchCompanyData(myCompanyId, selectedCompaniesId);
  const myCompany = compStatus.list.find(
    (company) => company.id === myCompanyId
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const completeTask = () => {
    setIsModalOpen(false);
    setIsPopupOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const closePopup = () => setIsPopupOpen(false);
  const handleCompSelect = (selectedOption) => {
    setCompStatus((prev) => ({
      sort: selectedOption,
      list: sortData([...prev.list], selectedOption)
    }));
  };
  const handleRankSelect = async (selectedOption) => {
    const nextList = await getRankAndNearbyCompanies({
      myCompanyId,
      order: selectedOption
    });
    setRankStatus((prev) => ({
      sort: selectedOption,
      list: nextList
    }));
  };
  if (compStatus.list.length === 0) return <div>로딩중</div>;
  else
    return (
      <div className={styles.compareResultPage}>
        <MyCompanyCard
          myCompany={myCompany}
          className={styles.myCompanyCardLayout}
        />
        <div className={styles.selectTableLayout}>
          <div className={styles.header}>
            <h1 className={styles.tableTitle}>내가 선택한 기업</h1>
            <SortContent
              onSelect={handleCompSelect}
              defaultOption={compStatus.sort}
              sortOption="list"
            />
          </div>
          <CompanyInfoTable
            type="compareResult"
            list={compStatus.list}
            highLightId={myCompanyId}
            className={styles.tableLayout}
          />
        </div>
        <div className={styles.rankingTableLayout}>
          <div className={styles.header}>
            <h1 className={styles.tableTitle}>기업 순위 확인하기</h1>
            <SortContent
              onSelect={handleRankSelect}
              defaultOption={rankStatus.sort}
              sortOption="list"
            />
          </div>
          <CompanyInfoTable
            type="standard"
            list={rankStatus.list}
            highLightId={myCompanyId}
            className={styles.tableLayout}
          />
        </div>
        <button onClick={openModal} className={styles.investBtn}>
          나의 기업에 투자하기
        </button>
        {isModalOpen && (
          <InvestModal
            mode="post"
            completeTask={completeTask}
            closeModal={closeModal}
            myCompany={myCompany}
          />
        )}
        {isPopupOpen && <InvestmentPopup closePopup={closePopup} />}
      </div>
    );
}
export default CompareResultPage;
