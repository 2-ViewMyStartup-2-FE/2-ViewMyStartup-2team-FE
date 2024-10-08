import { useState } from "react";
import styles from "../css/InvestModal.module.css";
import InvestmentCompanyBrief from "./InvestmentCompanyBrief.js";
import InvestmentForm from "./InvestmentForm.js";
import InvestModalHeader from "./InvestModalHeader.js";
import InvestmentButton from "./InvestmentButton.js";
import { patchInvestment } from "../api/CompanyDetailAPI.js";
import ConvertBillion from "../utils/ConvertBillion.js";

export default function EditInvestment({
  investment, // 선택된 투자자 정보
  myCompany, // 기업 정보
  onClose, // 모달 닫기 함수
  setInvestments, // 투자 리스트 업데이트 함수
  // verifyPassword, // 비밀번호 검증 함수
}) {
  const [formData, setFormData] = useState({
    name: investment.investorName || "", // 기존 데이터로 초기화
    amount: investment.amount || "",
    comment: investment.comment || "",
    password: "",
    confirmPassword: "",
  }); // 입력값을 state로 관리

  const onBlurField = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value })); //입력값을 변경 onBlur로 사용

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const onTogglePassword = () => setIsPasswordVisible((prev) => !prev);
  const onToggleConfirm = () => setIsConfirmVisible((prev) => !prev);

  // 비밀번호 확인 및 투자 정보 PATCH 요청
  const onSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 검증
    // if (!verifyPassword(formData.password, investment.id)) {
    //   alert("투자 시 등록한 비밀번호를 입력해주세요.");
    //   return;
    // }

    try {
      // PATCH 요청 보내기
      const updatedInvestment = await patchInvestment(investment.id, {
        investorName: formData.name,
        amount: formData.amount,
        comment: formData.comment,
        password: formData.password,
      });

      setInvestments((prevInvestments) => {
        // 수정된 투자 데이터를 반영
        const updatedList = prevInvestments.map((inv) =>
          inv.id === investment.id ? updatedInvestment : inv
        );
        return formatAndSortInvestments(updatedList); // 정렬 및 포맷팅
      });
      onClose();
    } catch (error) {
      alert(error.message); // 에러 메시지 출력
    }
  };

  const formatAndSortInvestments = (investments) => {
    return investments
      .sort((a, b) => b.amount - a.amount) // 금액을 기준으로 내림차순 정렬
      .map((investment, index) => ({
        ...investment,
        rank: `${index + 1}위`, // 순위 추가
        formattedAmount: ConvertBillion(investment.amount), // 금액 포맷팅
      }));
  };

  // 각 form 필드의 설정을 객체로 정의
  const formFields = [
    {
      mode: "edit",
      type: "name",
      value: formData.name,
      onBlur: onBlurField("name"),
    },
    {
      mode: "edit",
      type: "amount",
      value: formData.amount,
      onBlur: onBlurField("amount"),
    },
    {
      mode: "edit",
      type: "comment",
      value: formData.comment,
      onBlur: onBlurField("comment"),
    },
    {
      mode: "edit",
      type: "password",
      value: formData.password,
      onBlur: onBlurField("password"),
      isVisible: isPasswordVisible,
      onToggle: onTogglePassword,
    },
    {
      mode: "edit",
      type: "confirm",
      value: formData.confirmPassword,
      onBlur: onBlurField("confirmPassword"),
      isVisible: isConfirmVisible,
      onToggle: onToggleConfirm,
    },
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
            className={styles.buttonMargin}
          />
        </form>
      </div>
    </div>
  );
}
