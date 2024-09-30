import style from "../css/ManyChoiceCompany.module.css";

function CompanyListItem({ itemLimit, data }) {
  const visibleData = data.slice(0, itemLimit); // 처음 5개만 표시

  return (
    <div className={style.table}>
      <div className={style.container}>
        <p className={style.headFont}>많이 선택한 기업</p>
        <div className={style.listSection}>
          {visibleData.map((item, index) => (
            <div key={index} className={style.listItem}>
              <div className={style.company}>
                <img className={style.logo} src={item.logoImage} alt="logo" />
                <div className={style.companyName}>{item.name}</div>
                <div className={style.category}>{item.category}</div>
              </div>
              <button className={style.selectButton}>선택하기</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyListItem;
