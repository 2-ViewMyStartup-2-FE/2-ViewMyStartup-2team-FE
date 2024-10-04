import style from "../css/AddCompanyList.module.css";
import defaultImg from "../asset/images/img_company_default_logo.png";

function AddCompanyListItem({ item, onRemove }) {
  return (
    <div className={style.container}>
      <div className={style.company}>
        <img
          className={style.logo}
          src={item.logo === "" ? defaultImg : item.logo}
          alt="logo"
        />
        <p className={style.companyName}>{item.name}</p>
        <p className={style.category}>{item.category}</p>
      </div>
      <button className={style.selectButton} onClick={()=>onRemove(item.id)}>선택 해제</button>
    </div>
  );
}

function AddCompanyList({ selectedCompanies, onRemoveCompany }) {
  return (
    <>
      <div className={style.selectListContainer}>
        {selectedCompanies && selectedCompanies.length > 0 ? (
          <ul className={style.selectList}>
            {selectedCompanies.map((item) => (
              <li key={item.id} className={style.resultItem}>
                <AddCompanyListItem item={item} onRemove={onRemoveCompany}  />
              </li>
            ))}
          </ul>
        ) : (
          <p>선택한 기업이 없습니다.</p>
        )}
      </div>
    </>
  );
}

export default AddCompanyList;
