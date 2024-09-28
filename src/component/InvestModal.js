import styles from "../css/InvestModal.module.css";
import { useState } from "react";
import InvestModalHeader from "./InvestModalHeader.js";
import InvestmentCompanyBrief from "./InvestmentCompanyBrief.js";
import InvestmentForm from "./InvestmentForm.js";
import InvestmentButton from "./InvestmentButton.js";
function InvestModal({ completeTask, closeModal }) {
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
    console.log(formData);
    completeTask();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.frame}>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.layoutContainer}>
            <InvestModalHeader closeModal={closeModal} />
            <InvestmentCompanyBrief />
          </div>
          <InvestmentForm type="name" onBlur={onBlurField("name")} />
          <InvestmentForm type="amount" onBlur={onBlurField("amount")} />
          <InvestmentForm type="comment" onBlur={onBlurField("comment")} />
          <InvestmentForm
            type="password"
            onBlur={onBlurField("password")}
            isVisible={isPasswordVisible}
            onToggle={onTogglePassword}
          />
          <InvestmentForm
            type="confirm"
            onBlur={onBlurField("confirmPassword")}
            isVisible={isConfirmVisible}
            onToggle={onToggleConfirm}
          />
          <InvestmentButton closeModal={closeModal} onSubmit={onSubmit} />
        </form>
      </div>
    </div>
  );
}
export default InvestModal;
