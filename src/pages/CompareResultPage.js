import styles from "../css/CompareResultPage.module.css";
import SelectedCompanyCard from "../component/SelectedCompanyCard.js";
import ComparisonTable from "../component/ComparisonTable.js";
import InvestModal from "../component/InvestModal.js";
import InvestmentPopup from "../component/InvestmentPopup.js";
import { useState, useEffect } from "react";
import { getRankAndNearbyCompanies } from "../api/CompareResultAPI.js";
const myComanyMockData = {
  name: "코드잇",
  logo: "https://logo-resources.thevc.kr/organizations/200x200/485bb55e3da6f0af944776691c82f49d7131836de10d5718ec79242d44edfce4_1585722287000593.jpg",
  rank: 14,
  description: "코드잇은 온라인 교육",
  category: "에듀테크",
  totalInvestment: 14000000000,
  revenue: 5000000000,
  employee: 68
};
const selectedMockData = [
  {
    name: "스타트업 A",
    logo: "https://logo-resources.thevc.kr/organizations/200x200/485bb55e3da6f0af944776691c82f49d7131836de10d5718ec79242d44edfce4_1585722287000593.jpg",
    rank: 16,
    description: "스타트업 A는 혁신적인 기술 솔루션을 제공합니다.",
    category: "IT",
    totalInvestment: 20000000000,
    revenue: 10000000000,
    employee: 120
  },
  {
    name: "헬로우 월드",
    logo: "https://logo-resources.thevc.kr/organizations/200x200/485bb55e3da6f0af944776691c82f49d7131836de10d5718ec79242d44edfce4_1585722287000593.jpg",
    rank: 27,
    description: "헬로우 월드는 AI 기반의 고객 서비스 플랫폼입니다.",
    category: "테크",
    totalInvestment: 30000000000,
    revenue: 15000000000,
    employee: 85
  },
  {
    name: "그린 에너지",
    logo: "https://logo-resources.thevc.kr/organizations/200x200/485bb55e3da6f0af944776691c82f49d7131836de10d5718ec79242d44edfce4_1585722287000593.jpg",
    rank: 59,
    description: "그린 에너지는 지속 가능한 에너지 솔루션을 제공합니다.",
    category: "에너지",
    totalInvestment: 25000000000,
    revenue: 8000000000,
    employee: 50
  },
  {
    name: "푸드 테크",
    logo: "https://logo-resources.thevc.kr/organizations/200x200/485bb55e3da6f0af944776691c82f49d7131836de10d5718ec79242d44edfce4_1585722287000593.jpg",
    rank: 87,
    description: "푸드 테크는 식품 기술 혁신을 선도합니다.",
    category: "식품",
    totalInvestment: 18000000000,
    revenue: 7000000000,
    employee: 40
  }
];
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
  MYCOMPANY = myComanyMockData,
  SELETEDCOMPANIES = selectedMockData
}) {
  const myCompanyId = "9d0k1c26-6f16-464e-829f-8fcf442634e3";
  const [compStatus, setCompStatus] = useState({
    sort: "누적 투자금액 높은순",
    list: sortData([MYCOMPANY, ...SELETEDCOMPANIES], "누적 투자금액 높은순")
  });
  const [rankStatus, setRankStatus] = useState({
    sort: "누적 투자금액 높은순",
    list: []
  });
  useEffect(() => {
    const fetchData = async () => {
      const rankList = await getRankAndNearbyCompanies({ myCompanyId });
      setRankStatus((prev) => ({
        ...prev,
        list: rankList
      }));
    };
    fetchData();
  }, [myCompanyId]);
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

  return (
    <div className={styles.compareResultPage}>
      <SelectedCompanyCard
        myCompany={MYCOMPANY}
        className={styles.selectedCompanyCardLayout}
      />
      <ComparisonTable
        type="select"
        className={styles.selectTableLayout}
        list={compStatus.list}
        onSelect={handleCompSelect}
        defaultOption={compStatus.sort}
        sortOption="list"
      />
      <ComparisonTable
        type="ranking"
        className={styles.rankingTableLayout}
        list={rankStatus.list}
        onSelect={handleRankSelect}
        defaultOption={rankStatus.sort}
        sortOption="list"
      />
      <button onClick={openModal} className={styles.investBtn}>
        나의 기업에 투자하기
      </button>
      {isModalOpen && (
        <InvestModal
          completeTask={completeTask}
          closeModal={closeModal}
          myCompany={MYCOMPANY}
        />
      )}
      {isPopupOpen && <InvestmentPopup closePopup={closePopup} />}
    </div>
  );
}
export default CompareResultPage;
