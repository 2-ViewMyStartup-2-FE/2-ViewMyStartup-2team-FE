import styles from "../css/CompanyInvestmentAction.module.css";
import ConvertBillion from "../utils/ConvertBillion.js";
import InvestModal from "./InvestModal.js";
import { useState } from "react";

function CompanyInvestmentAction({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const formatNumber = (value) => ConvertBillion(parseInt(value));

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
            myCompany={data}
          />
        )}
      </div>
      <div className={styles.investment}>
        총 {formatNumber(data.virtualInvestment)} 원
      </div>
    </div>
  );
}

export default CompanyInvestmentAction;
