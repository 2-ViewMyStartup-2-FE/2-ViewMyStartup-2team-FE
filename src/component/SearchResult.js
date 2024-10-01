import style from "../css/SearchResult.module.css";
import defaultImg from "../asset/images/img_company_default_logo.png"

function CompanyList({ item ,onSelect}) {
  return (
    <div className={style.container}>
      <div className={style.company}>
      <img className={style.logo} src={item.logoImage === "" ? defaultImg : item.logoImage} alt="logo" />
        <p className={style.companyName}>{item.name}</p>
        <p className={style.category}>{item.category}</p>
      </div>
      <button className={style.selectButton} onClick={() => onSelect(item)}>선택하기</button>
    </div>
  );
}

function SearchResult({ data ,onSelect}) {
  return (
    <div className={style.listSection}>
      {data && data.length > 0 ? (
        <ul className={style.listItem}>
          {data.map((item) => (
            <li key={item.id} className={style.resultItem}>
              <CompanyList item={item} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default SearchResult;
