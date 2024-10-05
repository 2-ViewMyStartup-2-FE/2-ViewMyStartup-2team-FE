import styles from "../css/DeleteInvestment.module.css";
import closeIcon from "../asset/images/ic_delete.png";
import openEyeIcon from "../asset/images/open-eyes.png";
import closeEyeIcon from "../asset/images/closed-eyes.png";
import { useState } from "react";
import ErrorModal from "./ErrorModal.js";
import { deleteInvestment } from "../api/CompanyDetailAPI.js";

export default function DeleteInvestment({
  investment,
  onClose,
  setInvestments,
  verifyPassword, // 비밀번호 검증 함수 전달
}) {
  const [inputPassword, setInputPassword] = useState(""); // 입력된 비밀번호
  const [passwordToggle, setPasswordToggle] = useState(false); // 비밀번호 표시 토글
  const [isErrorModal, setIsErrorModal] = useState(false); // 에러 모달 상태

  // 비밀번호 보이기/숨기기 토글
  const handlePasswordToggle = () => setPasswordToggle(!passwordToggle);

  // 비밀번호 검증 후 삭제 처리
  const handlePasswordVerify = async () => {
    const isPasswordCorrect = verifyPassword(inputPassword, investment.id);

    if (isPasswordCorrect) {
      // 비밀번호가 맞으면 삭제 API 호출
      const deleteSuccess = await deleteInvestment(investment.id);

      if (deleteSuccess) {
        // 삭제 성공 시 상태에서 해당 투자자 삭제
        setInvestments((prevInvestments) =>
          prevInvestments.filter((inv) => inv.id !== investment.id)
        );
        onClose(); // 모달 닫기
      } else {
        // 삭제 실패 시 에러 모달 표시
        setIsErrorModal(true);
      }
    } else {
      // 비밀번호가 틀렸을 때 에러 모달 표시
      setIsErrorModal(true);
    }
  };

  // 에러 모달 확인 버튼 처리
  const handleErrorConfirmBtn = () => {
    setIsErrorModal(false); // 에러 모달 닫기
    setInputPassword(""); // 비밀번호 초기화
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        className={`${styles.modalContainer} ${
          isErrorModal ? styles.errorContainer : ""
        }`}
      >
        {/* 비밀번호 인증 모달 */}
        {!isErrorModal && (
          <>
            <div className={styles.modalTitle}>
              <h1>삭제 권한 인증</h1>
              <img src={closeIcon} alt="취소버튼" onClick={onClose} />
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalinput}>
                <label>비밀번호</label>
                <input
                  type={!passwordToggle ? "password" : "text"}
                  placeholder="패스워드를 입력해주세요"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <img
                  src={!passwordToggle ? openEyeIcon : closeEyeIcon}
                  onClick={handlePasswordToggle}
                  alt="passwordToggle"
                />
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={handlePasswordVerify}>삭제하기</button>
              </div>
            </div>
          </>
        )}

        {/* 에러 모달 */}
        {isErrorModal && (
          <ErrorModal
            onClose={onClose}
            handleErrorConfirmBtn={handleErrorConfirmBtn}
          />
        )}
      </div>
    </div>
  );
}
