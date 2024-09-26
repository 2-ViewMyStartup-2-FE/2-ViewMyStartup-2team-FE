import styles from "../css/Pagination.module.css";
import rightArrow from "../asset/images/ic_arrow_right.png";
import leftArrow from "../asset/images/ic_arrow_left.png";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 이전 페이지 버튼 클릭 핸들러
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지 버튼 클릭 핸들러
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.paginationWrapper}>
      <button
        className={styles.prevPageBtn}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <img src={leftArrow} alt="leftArrow" />
      </button>
      <div className={styles.pageBtns}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={currentPage === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className={styles.nextPageBtn}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <img src={rightArrow} alt="rightArrow" />
      </button>
    </div>
  );
}
