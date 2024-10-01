import styles from "../css/DeleteInvestment.module.css";
import closeIcon from "../asset/images/ic_delete.png";
import openEyeIcon from "../asset/images/open-eyes.png";
import closeEyeIcon from "../asset/images/closed-eyes.png";
import { useEffect, useState } from "react";
import ErrorModal from "./ErrorModal.js";

export default function DeleteInvestment({
  investorId,
  investments,
  setInvestments,
  onClose,
  inputPassword,
  setInputPassword,
  isPasswordVerified,
  setIsPasswordVerified,
  onVerifyPassword,
}) {
  const [isErrorModal, setIsErrorModal] = useState(false); // 에러 모달 상태
  const [passwordToggle, setPasswordToggle] = useState(false);

  // 비밀번호 확인 및 삭제 처리
  useEffect(() => {
    if (isPasswordVerified) {
      setInvestments(
        investments.filter((investor) => investor.id !== investorId)
      );
      onClose();
    }
  }, [isPasswordVerified, investorId, investments, onClose, setInvestments]);

  const handlePasswordVerify = () => {
    onVerifyPassword();
    if (!isPasswordVerified) {
      setIsErrorModal(true);
    }
  };

  // 에러 확인 버튼 클릭 시 원래 모달로 복귀
  const handleErrorConfirmBtn = () => {
    setIsErrorModal(false); // 에러 모달 닫기
    setInputPassword(""); // 비밀번호 필드 초기화
    setIsPasswordVerified(false); // 비밀번호 인증 초기화
  };

  const handlePasswordToggle = () => {
    setPasswordToggle(!passwordToggle);
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
