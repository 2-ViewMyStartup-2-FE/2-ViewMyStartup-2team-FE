import styles from "../css/DeleteInvestment.module.css";
import closeIcon from "../asset/images/ic_delete.png";
import { useEffect, useState } from "react";

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
  const [isError, setIsError] = useState(false); // 에러 모달 상태

  // 비밀번호 확인 및 삭제 처리
  useEffect(() => {
    if (isPasswordVerified) {
      setInvestments(
        investments.filter((investor) => investor.id !== investorId)
      );
      onClose();
    }
  }, [isPasswordVerified, investorId, investments, onClose, setInvestments]);

  const handleDelete = () => {
    onVerifyPassword();
    if (!isPasswordVerified) {
      setIsError(true);
    }
  };

  // 에러 확인 버튼 클릭 시 원래 모달로 복귀
  const handleErrorConfirm = () => {
    setIsError(false); // 에러 모달 닫기
    setInputPassword(""); // 비밀번호 필드 초기화
    setIsPasswordVerified(false); // 비밀번호 인증 초기화
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        className={`${styles.modalContainer} ${
          isError ? styles.errorContainer : ""
        }`}
      >
        {/* 비밀번호 인증 모달 */}
        {!isError && (
          <>
            <div className={styles.modalTitle}>
              <h1>삭제 권한 인증</h1>
              <img src={closeIcon} alt="취소버튼" onClick={onClose} />
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalinput}>
                <label>비밀번호</label>
                <input
                  type="password"
                  placeholder="패스워드를 입력해주세요"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={handleDelete}>삭제하기</button>
              </div>
            </div>
          </>
        )}

        {/* 에러 모달 */}
        {isError && (
          <>
            <div className={styles.ErrorModalTitle}>
              <img src={closeIcon} alt="취소" onClick={onClose} />
            </div>
            <div className={styles.ErrorModalContent}>
              <p>잘못된 비밀번호로 삭제에 실패하셨습니다.</p>
              <div className={styles.buttonContainer}>
                <button onClick={handleErrorConfirm}>확인</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
