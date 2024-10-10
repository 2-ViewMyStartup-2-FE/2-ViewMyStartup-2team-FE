import { deleteInvestment } from "../api/CompanyDetailAPI.js";
import closeIcon from "../asset/images/ic_delete.png";
import styles from "../css/DeleteInvestment.module.css";
import ConvertBillion from "../utils/ConvertBillion.js";

export default function DeleteInvestment({
  investment,
  onClose,
  setInvestments,
  setErrorMessage,
  setIsErrorModal,
  setShowDeleteModal,
}) {
  // 삭제 처리
  const handleDelete = async () => {
    const deleteSuccess = await deleteInvestment(investment.id);

    if (deleteSuccess) {
      // 삭제 성공 시 상태에서 해당 투자자 삭제 후 순위 재정렬
      setInvestments((prevInvestments) => {
        const updatedInvestments = prevInvestments.filter(
          (inv) => inv.id !== investment.id
        );
        return formatAndSortInvestments(updatedInvestments); // 순위 재정렬
      });
      onClose(); // 모달 닫기
    } else {
      // 삭제 실패 시 에러 처리 (필요시 추가)
      setErrorMessage("투자를 삭제하는데 실패하였습니다.");
      setIsErrorModal(true);
      setShowDeleteModal(false);
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
    <>
      <div className={styles.deleteModalTitle}>
        <img src={closeIcon} alt="취소" onClick={onClose} />
      </div>
      <div className={styles.deleteModalContent}>
        <p>정말로 삭제하시겠습니까?</p>
        <div className={styles.buttonContainer}>
          <button onClick={handleDelete}>삭제하기</button>
        </div>
      </div>
    </>
  );
}
