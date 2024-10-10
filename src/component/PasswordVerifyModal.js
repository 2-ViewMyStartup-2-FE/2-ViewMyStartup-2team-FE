import styles from "../css/PasswordVerifyModal.module.css";
import closeIcon from "../asset/images/ic_delete.png";
import openEyeIcon from "../asset/images/open-eyes.png";
import closeEyeIcon from "../asset/images/closed-eyes.png";
import { useState } from "react";
import ErrorModal from "./ErrorModal.js";
import EditInvestment from "./EditInvestment.js";
import DeleteInvestment from "./DeleteInvestment.js";

export default function PasswordVerifyModal({
  mode, // "edit" 또는 "delete" 모드
  investment,
  myCompany,
  onClose,
  fetchData
}) {
  const [inputPassword, setInputPassword] = useState(""); // 입력된 비밀번호
  const [passwordToggle, setPasswordToggle] = useState(false); // 비밀번호 표시 토글
  const [isErrorModal, setIsErrorModal] = useState(false); // 에러 모달 상태
  const [errorMessage, setErrorMessage] = useState("");
  const [showEditInvestment, setShowEditInvestment] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePasswordVerify = () => {
    if (inputPassword === investment.password) {
      if (mode === "edit") {
        setShowEditInvestment(true); // EditInvestment 컴포넌트를 보여줌
      } else if (mode === "delete") {
        setShowDeleteModal(true); // DeleteInvestment 관련 모달을 띄움
      }
    } else {
      setErrorMessage("잘못된 비밀번호로 인증에 실패하셨습니다.");
      setIsErrorModal(true); // 에러 모달 띄우기
    }
  };

  // 비밀번호 보이기/숨기기 토글
  const handlePasswordToggle = () => setPasswordToggle(!passwordToggle);

  // 에러 모달 확인 버튼 처리
  const handleErrorConfirmBtn = () => {
    setIsErrorModal(false); // 에러 모달 닫기
    setInputPassword(""); // 비밀번호 초기화
    setErrorMessage(""); // 에러 메시지 초기화
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        className={`${styles.modalContainer} ${
          showDeleteModal || isErrorModal ? styles.errorContainer : ""
        }`}
      >
        {/* 비밀번호 인증 모달 */}
        {!showEditInvestment && !showDeleteModal && !isErrorModal && (
          <>
            <div className={styles.modalTitle}>
              <h1>{mode === "edit" ? "수정 권한 인증" : "삭제 권한 인증"}</h1>
              <img src={closeIcon} alt="취소버튼" onClick={onClose} />
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalinput}>
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
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
                {mode === "edit" ? (
                  <button onClick={handlePasswordVerify}>수정하기</button>
                ) : (
                  <button onClick={handlePasswordVerify}>삭제하기</button>
                )}
              </div>
            </div>
          </>
        )}

        {/* EditInvestment 컴포넌트 보여주기 */}
        {showEditInvestment && (
          <EditInvestment
            investment={investment}
            myCompany={myCompany}
            onClose={onClose}
            fetchData={fetchData}
          />
        )}

        {/* DeleteInvestment 컴포넌트 보여주기 */}
        {showDeleteModal && (
          <DeleteInvestment
            investment={investment}
            onClose={onClose}
            setErrorMessage={setErrorMessage}
            setIsErrorModal={setIsErrorModal}
            setShowDeleteModal={setShowDeleteModal}
            fetchData={fetchData}
          />
        )}

        {/* 에러 모달 */}
        {isErrorModal && (
          <ErrorModal
            onClose={onClose}
            errorMessage={errorMessage}
            handleErrorConfirmBtn={handleErrorConfirmBtn}
          />
        )}
      </div>
    </div>
  );
}
