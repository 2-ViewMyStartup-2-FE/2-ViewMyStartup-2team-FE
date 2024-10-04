import styles from "../css/InvestModal.module.css";
import { useState } from "react";
import InvestModalHeader from "./InvestModalHeader.js";
import InvestmentCompanyBrief from "./InvestmentCompanyBrief.js";
import InvestmentForm from "./InvestmentForm.js";
import InvestmentButton from "./InvestmentButton.js";
import { postInvestment } from "../api/CompareResultAPI.js";
function InvestModal({ completeTask, closeModal, myCompany }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    comment: "",
    password: "",
    confirmPassword: ""
  }); // 입력값을 state로 관리
  const onBlurField = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value })); //입력값을 변경 onBlur로 사용
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const onTogglePassword = () => setIsPasswordVisible((prev) => !prev);
  const onToggleConfirm = () => setIsConfirmVisible((prev) => !prev);
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const sumbitData = {
        investorName: formData.name,
        amount: formData.amount,
        comment: formData.comment,
        password: formData.password,
        companyId: myCompany.id
      };
      postInvestment(myCompany.id, sumbitData);
    } catch (e) {
      console.log(e.message);
    }
    completeTask();
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.frame}>
        <form className={styles.form} onSubmit={onSubmit}>
          <InvestModalHeader closeModal={closeModal} />
          <InvestmentCompanyBrief
            myCompany={myCompany}
            className={styles.briefMargin}
          />

          <InvestmentForm
            type="name"
            onBlur={onBlurField("name")}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            type="amount"
            onBlur={onBlurField("amount")}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            type="comment"
            onBlur={onBlurField("comment")}
            className={styles.investFormMargin}
          />

          <InvestmentForm
            type="password"
            onBlur={onBlurField("password")}
            isVisible={isPasswordVisible}
            onToggle={onTogglePassword}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            type="confirm"
            onBlur={onBlurField("confirmPassword")}
            isVisible={isConfirmVisible}
            onToggle={onToggleConfirm}
            className={styles.investFormMargin}
          />
          <InvestmentButton
            closeModal={closeModal}
            className={styles.buttonMargin}
          />
        </form>
      </div>
    </div>
  );
}
export default InvestModal;
