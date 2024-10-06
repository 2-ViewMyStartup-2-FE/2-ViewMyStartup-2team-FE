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
  verifyPassword, // 비밀번호 검증 함수
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
    if (!verifyPassword(formData.password, investment.id)) {
      alert("비밀번호가 잘못되었습니다.");
      return;
    }

    // PATCH 요청 보내기
    const updatedInvestment = await patchInvestment(investment.id, {
      investorName: formData.name,
      amount: formData.amount,
      comment: formData.comment,
      password: formData.password,
    });

    console.log("패치 결과:", updatedInvestment);

    if (updatedInvestment) {
      setInvestments((prevInvestments) => {
        // 수정된 투자 데이터를 반영
        const updatedList = prevInvestments.map((inv) =>
          inv.id === investment.id ? updatedInvestment : inv
        );
        // 수정된 데이터를 정렬 및 포맷팅한 후 상태에 반영
        return formatAndSortInvestments(updatedList);
      });
      onClose();
    } else {
      alert("투자를 업데이트하지 못했습니다.");
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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.frame}>
        <form className={styles.form} onSubmit={onSubmit}>
          <InvestModalHeader mode="edit" closeModal={onClose} />
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
            closeModal={onClose}
            className={styles.buttonMargin}
          />
        </form>
      </div>
    </div>
  );
}
