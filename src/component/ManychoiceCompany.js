import style from "../css/ManyChoiceCompany.module.css";
import defaultImg from "../asset/images/img_company_default_logo.png";

function ManyChoiceCompany({ data, onSelect }) {
  return (
    <div className={style.table}>
      <div className={style.container}>
        <p className={style.headFont}>많이 선택한 기업</p>
        <div className={style.listSection}>
          {data.map((item) => (
            <div key={item.id} className={style.listItem}>
              <div className={style.company}>
                <img
                  className={style.logo}
                  src={item.logo === "" ? defaultImg : item.logo}
                  alt="logo"
                />
                <div className={style.companyName}>{item.name}</div>
                <div className={style.category}>{item.category}</div>
              </div>
              <button
                className={style.selectButton}
                onClick={() => onSelect(item)}
              >
                선택하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManyChoiceCompany;
