import styles from "../css/CompanyInvestmentAction.module.css";
import formatAmount from "../utils/formatAmount.js";
import InvestModal from "./InvestModal.js";
import { useState } from "react";

function CompanyInvestmentAction({ startupListData, fetchData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  const completeTask = () => {
    setIsModalOpen(false);
    // setIsPopupOpen(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.investInfoSection}>
      <div className={styles.investInfoTitle}>
        <h1>View My Startup에서 받은 투자</h1>
        <button className={styles.investBtn} onClick={openModal}>
          기업투자하기
        </button>
        {isModalOpen && (
          <InvestModal
            completeTask={completeTask}
            closeModal={closeModal}
            myCompany={startupListData}
            fetchData={fetchData}
          />
        )}
      </div>
      <div className={styles.investment}>
        {/* 투자자 리스트가 있을 때만 총 투자 금액을 표시 */}
        {startupListData.Investments &&
          startupListData.Investments.length > 0 &&
          `총 ${formatAmount(startupListData.virtualInvestment)}`}
      </div>
    </div>
  );
}

export default CompanyInvestmentAction;
