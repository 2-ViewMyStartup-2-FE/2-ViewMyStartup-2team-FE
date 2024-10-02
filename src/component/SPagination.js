import style from "../css/SPagination.module.css";
import arrow_left from "../asset/images/ic_arrow_left.png";
import arrow_right from "../asset/images/ic_arrow_right.png";

export default function SPagination({
  currentPage,
  setCurrentPage,
  totalCount,
  itemLimit,
  className,
}) {
  const pageLimit = 5; // 보여줄 최대 페이지 수
  const totalPage = Math.ceil(totalCount / itemLimit); // 전체 페이지 수

  const getVisiblePages = () => {
    const pageGroup = Math.ceil(currentPage / pageLimit); // 현재 페이지 그룹
    const startPage = (pageGroup - 1) * pageLimit + 1;
    const endPage = Math.min(startPage + pageLimit - 1, totalPage);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className={style.page}>
      <div
        className={`${style.pageBtn} ${className || ""}`}
        onClick={handlePrevClick}
      >
        <img src={arrow_left} alt="left" />
      </div>
      {visiblePages.map((page) => (
        <div
          key={page}
          className={`${style.pageBtn} ${
            currentPage === page ? style.active : ""
          } ${className || ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </div>
      ))}
      <div
        className={`${style.pageBtn} ${className || ""}`}
        onClick={handleNextClick}
      >
        <img src={arrow_right} alt="right" />
      </div>
    </div>
  );
}
