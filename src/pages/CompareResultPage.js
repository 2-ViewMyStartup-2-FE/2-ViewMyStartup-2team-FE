import styles from "../css/CompareResultPage.module.css";
import SelectedCompanyCard from "../component/SelectedCompanyCard";
import ComparisonTable from "../component/ComparisonTable";
import InvestModal from "../component/InvestModal";
import InvestmentPopup from "../component/InvestmentPopup";
import { useState } from "react";
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
function CompareResultPage({
  MYCOMPANY = myComanyMockData,
  SELETEDCOMPANIES = selectedMockData
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const completeTask = () => {
    setIsModalOpen(false);
    setIsPopupOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const closePopup = () => setIsPopupOpen(false);
  const list = [MYCOMPANY, ...SELETEDCOMPANIES];
  return (
    <div className={styles.compareResultPage}>
      <SelectedCompanyCard
        myCompany={MYCOMPANY}
        className={styles.selectedCompanyCardLayout}
      />
      <ComparisonTable
        type="select"
        className={styles.selectTableLayout}
        list={list}
      />
      <ComparisonTable
        type="ranking"
        className={styles.rankingTableLayout}
        list={list}
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
