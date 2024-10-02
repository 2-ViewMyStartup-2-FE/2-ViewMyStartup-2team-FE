import { useEffect, useState } from "react";
import styles from "../css/InvestModal.module.css";
import InvestmentCompanyBrief from "./InvestmentCompanyBrief.js";
import InvestmentForm from "./InvestmentForm.js";
import InvestModalHeader from "./InvestModalHeader.js";
import InvestmentButton from "./InvestmentButton.js";

export default function EditInvestment({
  investmentData,
  onSaveEdit,
  closeEditModal,
  myCompany,
  onVerifyPassword,
  isPasswordVerified,
}) {
  const [formData, setFormData] = useState({
    name: investmentData.name,
    amount: investmentData.amount,
    comment: investmentData.comment,
    password: "codeit",
    confirmPassword: "codeit",
  });

  const onBlurField = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const onTogglePassword = () => setIsPasswordVisible((prev) => !prev);
  const onToggleConfirm = () => setIsConfirmVisible((prev) => !prev);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호 확인이 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }

    if (formData.password) {
      console.log("Verifying password");
      onVerifyPassword(formData.password);
    }
  };

  useEffect(() => {
    console.log("Password Verified Status Changed: ", isPasswordVerified);
    if (isPasswordVerified) {
      console.log("Saving edit data");
      onSaveEdit(formData);
    }
  }, [isPasswordVerified, formData, onSaveEdit]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.frame}>
        <form className={styles.form} onSubmit={onSubmit}>
          <InvestModalHeader mode="edit" closeModal={closeEditModal} />
          <InvestmentCompanyBrief
            myCompany={myCompany}
            className={styles.briefMargin}
          />
          <InvestmentForm
            type="name"
            value={formData.name}
            onBlur={onBlurField("name")}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            mode="edit"
            type="amount"
            value={formData.amount}
            onBlur={onBlurField("amount")}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            mode="edit"
            type="comment"
            value={formData.comment}
            onBlur={onBlurField("comment")}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            mode="edit"
            type="password"
            value={formData.password}
            onBlur={onBlurField("password")}
            isVisible={isPasswordVisible}
            onToggle={onTogglePassword}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            mode="edit"
            type="confirm"
            value={formData.confirmPassword}
            onBlur={onBlurField("confirmPassword")}
            isVisible={isConfirmVisible}
            onToggle={onToggleConfirm}
            className={styles.investFormMargin}
          />
          <InvestmentButton
            mode="edit"
            closeModal={closeEditModal}
            className={styles.buttonMargin}
          />
        </form>
      </div>
    </div>
  );
}
