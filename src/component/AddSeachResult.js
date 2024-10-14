import style from "../css/SearchResult.module.css";
import defaultImg from "../asset/images/img_company_default_logo.png";
import checkedIcon from "../asset/images/ic_check.png";

function CompanyList({ item, onSelect, isSelected }) {
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
      <button
        className={isSelected ? style.clearButton : style.selectButton}
        onClick={() => onSelect(item)}
        disabled={isSelected}
      >
        {isSelected && (
          <img src={checkedIcon} alt="checked" className={style.iconCheck} />
        )}
        {isSelected ? `선택완료` : "선택하기"} 
      </button>
    </div>
  );
}

function AddSearchResult({ data, onSelect, selectedCompanies }) {

  return (
    <div className={style.listSection}>
      {data && data.length > 0 ? (
        <ul className={style.listItem}>
          {data.map((item) => {
            const isSelected = selectedCompanies.some((c) => c.id === item.id); 
            return (
              <li key={item.id} className={style.resultItem}>
                <CompanyList
                  item={item}
                  onSelect={onSelect}
                  isSelected={isSelected}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default AddSearchResult;
