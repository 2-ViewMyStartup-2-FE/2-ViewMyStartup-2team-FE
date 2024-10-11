import styles from "../css/MyCompanyCard.module.css";
import { Link } from "react-router-dom";
import defaultLogo from "../asset/images/img_company_default_logo.png";
function MyCompanyCard({ myCompany, className }) {
  const handleError = (e) => (e.target.src = defaultLogo);
  return (
    <div className={`${styles.myCompanyCard} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>내가 선택한 기업</h2>
        <Link to="/compare">
          <button className={styles.selectOtherCompanyBtn}>
            다른 기업 비교하기
          </button>
        </Link>
      </div>
      <div className={styles.companyInfoFrame}>
        <div className={styles.companyInfo}>
          <Link to={`/companies/${myCompany.id}`} className={styles.link}>
            <img
              src={myCompany.logo}
              className={styles.logo}
              alt="로고이미지"
              onError={handleError}
            />
            <p className={styles.name}>{myCompany.name}</p>
            <p className={styles.category}>{myCompany.category}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default MyCompanyCard;
