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
  const [validation, setValidation] = useState({
    name: "INITIAL",
    amount: "INITIAL",
    comment: "INITIAL",
    password: "INITIAL",
    confirmPassword: "INITIAL"
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    amount: "",
    comment: "",
    password: "",
    confirmPassword: ""
  });
  const validateField = (field, value) => {
    const changeState = (nextValidation, message) => {
      setErrorMessage((prev) => ({ ...prev, [field]: message }));
      setValidation((prev) => ({ ...prev, [field]: nextValidation }));
    };
    switch (field) {
      case "name":
        if (value.length < 2)
          changeState("FAIL", "이름은 2글자 이상이여야 합니다");
        else if (value.length > 10)
          changeState("FAIL", "이름은 10자 이하여야 합니다");
        else changeState("SUCCESS", "");
        break;
      case "amount":
        if (value < 100000000)
          changeState("FAIL", "투자 금액은 1억 이상이여야 합니다");
        else if (value > 1000000000000)
          changeState("FAIL", "투자 금액은 1조 미만이여야 합니다");
        else changeState("SUCCESS", "");
        break;
      case "comment":
        if (value.length < 10)
          changeState("FAIL", "코멘트는 10자 이상이여야 합니다");
        else if (value.length > 30)
          changeState("FAIL", "코멘트는 30자 이하여야 합니다");
        else changeState("SUCCESS", "");
        break;
      case "password":
        if (value.length < 8)
          changeState("FAIL", "비밀번호는 8자 이상이여야 합니다");
        else if (value.length > 15)
          changeState("FAIL", "비밀번호는 15자 이하여야 합니다");
        else changeState("SUCCESS", "");
        break;
      case "confirmPassword":
        if (value === formData.password) changeState("SUCCESS", "");
        else changeState("FAIL", "비밀번호가 동일하지 않습니다");
        break;
      default:
        throw new Error("필드명 오류");
    }
  };
  const isFormValid = () =>
    Object.values(validation).every((status) => status === "SUCCESS");

  const onBlurField = (field) => (e) => {
    validateField(field, e.target.value);
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const onTogglePassword = () => setIsPasswordVisible((prev) => !prev);
  const onToggleConfirm = () => setIsConfirmVisible((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    const sumbitData = {
      investorName: formData.name,
      amount: formData.amount,
      comment: formData.comment,
      password: formData.password,
      companyId: myCompany.id
    };
    await postInvestment(myCompany.id, sumbitData);
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
            errorMessage={errorMessage.name}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            type="amount"
            onBlur={onBlurField("amount")}
            errorMessage={errorMessage.amount}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            type="comment"
            onBlur={onBlurField("comment")}
            errorMessage={errorMessage.comment}
            className={styles.investFormMargin}
          />

          <InvestmentForm
            type="password"
            onBlur={onBlurField("password")}
            isVisible={isPasswordVisible}
            onToggle={onTogglePassword}
            errorMessage={errorMessage.password}
            className={styles.investFormMargin}
          />
          <InvestmentForm
            type="confirm"
            onBlur={onBlurField("confirmPassword")}
            isVisible={isConfirmVisible}
            onToggle={onToggleConfirm}
            errorMessage={errorMessage.confirmPassword}
            className={styles.investFormMargin}
          />
          <InvestmentButton
            closeModal={closeModal}
            className={styles.buttonMargin}
            disabled={!isFormValid()}
          />
        </form>
      </div>
    </div>
  );
}
export default InvestModal;
