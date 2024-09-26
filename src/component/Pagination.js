import styles from "../css/Pagination.module.css";
import rightArrow from "../asset/images/ic_arrow_right.png";
import leftArrow from "../asset/images/ic_arrow_left.png";

export default function Pagination() {
  const currentPageArray = [1, 2, 3, 4, 5];

  return (
    <div className={styles.paginationWrapper}>
      <button className={styles.prevPageBtn}>
        <img src={leftArrow} alt="leftArrow" />
      </button>
      <div className={styles.pageBtns}>
        {currentPageArray?.map((i) => (
          <button className={styles.active}>{i}</button>
        ))}
      </div>
      <button className={styles.nextPageBtn}>
        <img src={rightArrow} alt="rightArrow" />
      </button>
    </div>
  );
}
