import styles from "../css/CompareResultPage.module.css";
import SelectedCompanyCard from "../component/SelectedCompanyCard.js";
import ComparisonTable from "../component/ComparisonTable.js";
import InvestModal from "../component/InvestModal.js";
import InvestmentPopup from "../component/InvestmentPopup.js";
import { useState, useEffect } from "react";
import { getRankAndNearbyCompanies } from "../api/CompareResultAPI.js";
import { getStartup } from "../api/StartupAPI.js";
import defaultLogo from "../asset/images/img_company_default_logo.png";
const sortData = (data, option) => {
  const sortedData = [...data];
  switch (option) {
    case "누적 투자금액 높은순":
      return sortedData.sort((a, b) => b.totalInvestment - a.totalInvestment);
    case "누적 투자금액 낮은순":
      return sortedData.sort((a, b) => a.totalInvestment - b.totalInvestment);
    case "매출액 높은순":
      return sortedData.sort((a, b) => b.revenue - a.revenue);
    case "매출액 낮은순":
      return sortedData.sort((a, b) => a.revenue - b.revenue);
    case "고용 인원 많은순":
      return sortedData.sort((a, b) => b.employee - a.employee);
    case "고용 인원 적은순":
      return sortedData.sort((a, b) => a.employee - b.employee);
    default:
      return sortedData;
  }
};
function CompareResultPage({
  myCompanyId = "9d0k1c26-6f16-464e-829f-8fcf442634e3",
  SelectedCompaniesId = [
    "6d3f1c26-6f16-464e-829f-8fcf442634e3",
    "0d9j1c26-6f16-464e-829f-8fcf442634e3",
    "7d1a2c26-6f16-464e-829f-8fcf442634e3",
    "3d6g1c26-6f16-464e-829f-8fcf442634e3",
  ],
}) {
  const [myCompany, setMyCompany] = useState({});
  const [compStatus, setCompStatus] = useState({
    sort: "누적 투자금액 높은순",
    list: [],
  });
  const [rankStatus, setRankStatus] = useState({
    sort: "누적 투자금액 높은순",
    list: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const myCompanyData = await getStartup(myCompanyId);
      setMyCompany(myCompanyData);
      const selectedCompanies = await Promise.all(
        SelectedCompaniesId.map((id) => getStartup(id))
      );
      const compList = sortData(
        [myCompanyData, ...selectedCompanies],
        "누적 투자금액 높은순"
      );
      compList.forEach((company) => {
        if (!company.logo || company.logo.includes("example")) {
          company.logo = defaultLogo;
        }
      });
      setCompStatus((prev) => ({
        ...prev,
        list: compList,
      }));
      const rankList = await getRankAndNearbyCompanies({ myCompanyId });
      rankList.forEach((company) => {
        if (!company.logo || company.logo.includes("example")) {
          company.logo = defaultLogo;
        }
      });
      setRankStatus((prev) => ({
        ...prev,
        list: rankList,
      }));
    };
    fetchData();
  }, [SelectedCompaniesId, myCompanyId]);
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
      list: sortData([...prev.list], selectedOption),
    }));
  };
  const handleRankSelect = async (selectedOption) => {
    const nextList = await getRankAndNearbyCompanies({
      myCompanyId,
      order: convertStateToUrl(selectedOption),
    });
    nextList.forEach((company) => {
      if (!company.logo || company.logo.includes("example")) {
        company.logo = defaultLogo;
      }
    });
    setRankStatus((prev) => ({
      sort: selectedOption,
      list: nextList,
    }));
  };

  return (
    <div className={styles.compareResultPage}>
      <SelectedCompanyCard
        myCompany={myCompany}
        className={styles.selectedCompanyCardLayout}
      />
      <ComparisonTable
        type="select"
        className={styles.selectTableLayout}
        list={compStatus.list}
        onSelect={handleCompSelect}
        defaultOption={compStatus.sort}
        sortOption="list"
        myCompany={myCompany}
      />
      <ComparisonTable
        type="ranking"
        className={styles.rankingTableLayout}
        list={rankStatus.list}
        onSelect={handleRankSelect}
        defaultOption={rankStatus.sort}
        sortOption="list"
        myCompany={myCompany}
      />
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
