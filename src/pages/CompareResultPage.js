import styles from "../css/CompareResultPage.module.css";
import ComparisonTable from "../component/ComparisonTable";
import InvestModal from "../component/InvestModal";
import InvestmentPopup from "../component/InvestmentPopup";
import { useState } from "react";
function CompareResultPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const completeTask = () => {
    setIsModalOpen(false);
    setIsPopupOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const closePopup = () => setIsPopupOpen(false);
  return (
    <div className={styles.compareResultPage}>
      <div
        className={`${styles.componentSize} ${styles.componentLayout}`}
      ></div>
      <ComparisonTable type="select" className={styles.selectTableLayout} />
      <ComparisonTable type="ranking" className={styles.rankingTableLayout} />
      <button onClick={openModal} className={styles.investBtn}>
        나의 기업에 투자하기
      </button>
      {isModalOpen && (
        <InvestModal completeTask={completeTask} closeModal={closeModal} />
      )}
      {isPopupOpen && <InvestmentPopup closePopup={closePopup} />}
    </div>
  );
}
export default CompareResultPage;
