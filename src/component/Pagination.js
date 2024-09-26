import style from "../css/Pagination.module.css";
import arrow_left from "../asset/image/ic_arrow_left.png";
import arrow_right from "../asset/image/ic_arrow_right.png";

const ITEM_LIMIT = 10; // 페이지 당 항목 수

export default function Pagination({ currentPage, setCurrentPage, totalCount }) {
  const pageLimit = 5; // 보여줄 최대 페이지 수
  const totalPage = Math.ceil(totalCount / ITEM_LIMIT); // 전체 페이지 수

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
      <div className={style.pageBtn} onClick={handlePrevClick}>
        <img src={arrow_left} alt="left" />
      </div>
      {visiblePages.map((page) => (
        <div 
          key={page}
          className={`${style.pageBtn} ${currentPage === page ? style.active : ''}`} 
          onClick={() => handlePageClick(page)}>
          {page}
        </div>
      ))}
      <div className={style.pageBtn} onClick={handleNextClick}>
        <img src={arrow_right} alt="right" />
      </div>
    </div>
  );
}
