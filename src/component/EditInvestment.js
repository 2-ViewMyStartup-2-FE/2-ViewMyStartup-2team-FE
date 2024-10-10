import { useCallback, useEffect, useState } from "react";
import styles from "../css/InvestModal.module.css";
import InvestmentCompanyBrief from "./InvestmentCompanyBrief.js";
import InvestmentForm from "./InvestmentForm.js";
import InvestModalHeader from "./InvestModalHeader.js";
import InvestmentButton from "./InvestmentButton.js";
import { patchInvestment } from "../api/CompanyDetailAPI.js";
import bigInt from "big-integer";

export default function EditInvestment({
  investment, // 선택된 투자자 정보
  myCompany, // 기업 정보
  onClose, // 모달 닫기 함수
  fetchData
}) {
  const [formData, setFormData] = useState({
    name: investment.investorName || "", // 기존 데이터로 초기화
    amount: investment.amount || "",
    comment: investment.comment || "",
    password: investment.password || "",
    confirmPassword: investment.password || ""
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

  const validateField = useCallback(
    (field, value) => {
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
          // 정규 표현식으로 숫자 확인 (정수 또는 큰 수)
          const isValidNumber = /^[0-9]+$/.test(value.trim());
          if (!isValidNumber) {
            changeState("FAIL", "투자 금액은 숫자여야 합니다");
            break;
          }
          const bigIntValue = bigInt(value);
          if (bigIntValue.lt(100000000))
            // 1억 이상
            changeState("FAIL", "투자 금액은 1억 이상이여야 합니다");
          else if (bigIntValue.gt(1000000000000))
            // 1조 미만
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
    },
    [formData.password]
  );

  useEffect(() => {
    validateField("name", formData.name);
  }, [formData.name, validateField]);

  useEffect(() => {
    validateField("amount", formData.amount);
  }, [formData.amount, validateField]);

  useEffect(() => {
    validateField("comment", formData.comment);
  }, [formData.comment, validateField]);

  useEffect(() => {
    validateField("password", formData.password);
  }, [formData.password, validateField]);

  useEffect(() => {
    validateField("confirmPassword", formData.confirmPassword);
  }, [formData.confirmPassword, formData.password, validateField]);

  const isFormValid = () =>
    Object.values(validation).every((status) => status === "SUCCESS");

  const onChangeField = (field) => (e) => {
    validateField(field, e.target.value);
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const onTogglePassword = () => setIsPasswordVisible((prev) => !prev);
  const onToggleConfirm = () => setIsConfirmVisible((prev) => !prev);

  // 비밀번호 확인 및 투자 정보 PATCH 요청
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // PATCH 요청 보내기
      await patchInvestment(investment.id, {
        investorName: formData.name,
        amount: formData.amount,
        comment: formData.comment,
        password: formData.password
      });
      fetchData();
      onClose();
    } catch (error) {
      console.error(error.message); // 에러 메시지 출력
    }
  };

  // 각 form 필드의 설정을 객체로 정의
  const formFields = [
    {
      mode: "edit",
      type: "name",
      onChange: onChangeField("name"),
      errorMessage: errorMessage.name,
      value: formData.name
    },
    {
      mode: "edit",
      type: "amount",
      onChange: onChangeField("amount"),
      errorMessage: errorMessage.amount,
      value: formData.amount
    },
    {
      mode: "edit",
      type: "comment",
      onChange: onChangeField("comment"),
      errorMessage: errorMessage.comment,
      value: formData.comment
    },
    {
      mode: "edit",
      type: "password",
      onChange: onChangeField("password"),
      isVisible: isPasswordVisible,
      onToggle: onTogglePassword,
      errorMessage: errorMessage.password,
      value: formData.password
    },
    {
      mode: "edit",
      type: "confirm",
      onChange: onChangeField("confirmPassword"),
      isVisible: isConfirmVisible,
      onToggle: onToggleConfirm,
      errorMessage: errorMessage.confirmPassword,
      value: formData.confirmPassword
    }
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.frame}>
        <form className={styles.form} onSubmit={onSubmit}>
          <InvestModalHeader mode="edit" closeModal={onClose} />
          <InvestmentCompanyBrief
            myCompany={myCompany}
            className={styles.briefMargin}
          />
          {/* formFields 배열을 map으로 돌려서 InvestmentForm 컴포넌트 렌더링 */}
          {formFields.map((field) => (
            <InvestmentForm
              key={field.type} // type을 key로 사용
              {...field} // 필드 설정을 props로 전달
              className={styles.investFormMargin}
            />
          ))}
          <InvestmentButton
            mode="edit"
            closeModal={onClose}
            disabled={!isFormValid()}
            className={styles.buttonMargin}
          />
        </form>
      </div>
    </div>
  );
}
