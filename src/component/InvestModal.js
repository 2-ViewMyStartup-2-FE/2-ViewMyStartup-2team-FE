import styles from "../css/InvestModal.module.css";
import { useState } from "react";
import InvestModalHeader from "./InvestModalHeader.js";
import InvestmentCompanyBrief from "./InvestmentCompanyBrief.js";
import InvestmentForm from "./InvestmentForm.js";
import InvestmentButton from "./InvestmentButton.js";
function InvestModal({ closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    comment: "",
    password: "",
    confirmPassword: ""
  }); // 입력값을 state로 관리
  const [showPassword, setShowPassword] = useState(false); //비밀번호와 비밀번호 확인의 토글 상태를 state로 관리
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onBlurField = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value })); //입력값을 변경 onBlur로 사용
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    closeModal();
  };
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.frame}>
        <form className={styles.form}>
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
            onClickToggle={togglePasswordVisibility}
            isVisible={showPassword}
          />
          <InvestmentForm
            type="check"
            onBlur={onBlurField("check")}
            onClickToggle={toggleConfirmPasswordVisibility}
            isVisible={showConfirmPassword}
          />
          <InvestmentButton closeModal={closeModal} onSubmit={onSubmit} />
        </form>
      </div>
    </div>
  );
}
export default InvestModal;
