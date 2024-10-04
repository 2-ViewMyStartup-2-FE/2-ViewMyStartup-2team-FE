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
        disabled={isSelected} // 이미 선택된 기업은 버튼 비활성화
      >
        {isSelected && (
          <img src={checkedIcon} alt="checked" className={style.iconCheck} />
        )}
        {isSelected ? `선택완료` : "선택하기"} {/* 버튼 텍스트 변경 */}
      </button>
    </div>
  );
}

function AddSearchResult({ data, onSelect, selectedCompanies }) {
  // 기본값 설정
  return (
    <div className={style.listSection}>
      {data && data.length > 0 ? (
        <ul className={style.listItem}>
          {data.map((item) => {
            const isSelected = selectedCompanies.some((c) => c.id === item.id); // 선택 여부 확인
            return (
              <li key={item.id} className={style.resultItem}>
                <CompanyList
                  item={item}
                  onSelect={onSelect}
                  isSelected={isSelected}
                />{" "}
                {/* 선택 여부 전달 */}
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
