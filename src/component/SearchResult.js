import style from "../css/SearchResult.module.css";

function CompanyList({ item }) {
  return (
    <div className={style.container}>
      <div className={style.company}>
        <img className={style.logo} src={item.logoImage} alt="logo" />
        <p className={style.companyName}>{item.name}</p>
        <p className={style.category}>{item.category}</p>
      </div>
      <button className={style.selectButton}>선택하기</button>
    </div>
  );
}

function SearchResult({ data }) {
  return (
    <div className={style.listSection}>
      {data.length > 0 ? (
        <ul className={style.listItem}>
          {data.map((item, index) => (
            <li key={index} className={style.resultItem}>
              <CompanyList item={item} />
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
