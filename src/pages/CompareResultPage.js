import styles from "../css/CompareResultPage.module.css";
import { useLocation } from "react-router-dom";
import SelectedCompanyCard from "../component/SelectedCompanyCard.js";
import ComparisonTable from "../component/ComparisonTable.js";
import InvestModal from "../component/InvestModal.js";
import InvestmentPopup from "../component/InvestmentPopup.js";
import { useState } from "react";
import { getRankAndNearbyCompanies } from "../api/CompareResultAPI.js";
import useFetchCompanyData from "../hooks/useFetchCompanyData.js";
import sortData from "../utils/sortData.js";
import CompanyInfoTable from "../component/CompanyInfoTable.js";

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
  const convertStateToUrl = (selectedOption) => {
    switch (selectedOption) {
      case "누적 투자금액 높은순":
        return "investmentHighest";
      case "누적 투자금액 낮은순":
        return "investmentLowest";
      case "매출액 높은순":
        return "revenueHighest";
      case "매출액 낮은순":
        return "revenueLowest";
      case "고용 인원 많은순":
        return "employeeHighest";
      case "고용 인원 적은순":
        return "employeeLowest";
      default:
        return "investmentHighest";
    }
  };
  const handleCompSelect = (selectedOption) => {
    setCompStatus((prev) => ({
      sort: selectedOption,
      list: sortData([...prev.list], selectedOption)
    }));
  };
  const handleRankSelect = async (selectedOption) => {
    const nextList = await getRankAndNearbyCompanies({
      myCompanyId,
      order: convertStateToUrl(selectedOption)
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
        <SelectedCompanyCard
          myCompany={myCompany}
          className={styles.selectedCompanyCardLayout}
        />
        <CompanyInfoTable
          list={rankStatus.list}
          className={styles.selectedCompanyCardLayout}
          highLightId={myCompany.id}
          type={"standard"}
        />
        <CompanyInfoTable
          list={rankStatus.list}
          className={styles.selectedCompanyCardLayout}
          highLightId={myCompany.id}
          type={"compareResult"}
        />
        <CompanyInfoTable
          list={rankStatus.list}
          className={styles.selectedCompanyCardLayout}
          type={"compareStatus"}
        />
        <CompanyInfoTable
          list={rankStatus.list}
          className={styles.selectedCompanyCardLayout}
          type={"investmentStatus"}
        />
        {/* <ComparisonTable
          type="select"
          className={styles.selectTableLayout}
          list={compStatus.list}
          onSelect={handleCompSelect}
          defaultOption={compStatus.sort}
          sortOption="list"
          myCompany={myCompany}
        /> */}
        {/* <ComparisonTable
          type="ranking"
          className={styles.rankingTableLayout}
          list={rankStatus.list}
          onSelect={handleRankSelect}
          defaultOption={rankStatus.sort}
          sortOption="list"
          myCompany={myCompany}
        /> */}
        <button onClick={openModal} className={styles.investBtn}>
          나의 기업에 투자하기
        </button>
        {isModalOpen && (
          <InvestModal
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
