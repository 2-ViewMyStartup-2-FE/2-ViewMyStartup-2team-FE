import style from '../css/StartupList.module.css';

function StartupList({ currentPage, itemLimit, data }) {
  const startIndex = (currentPage - 1) * itemLimit; // 현재 페이지의 시작 인덱스
  const endIndex = startIndex + itemLimit; // 현재 페이지의 끝 인덱스

  const sortedData = data.map((item) => ({
    ...item,
    total: item.investment + item.revenue
  })).sort((a, b) => b.total - a.total);

  const visibleData = sortedData.slice(startIndex, endIndex);

  return (
    <div className={style.table}>
      {visibleData.map((item, index) => (
        <div key={index} className={style.listItem}>
          <div className={style.rank}>{startIndex + index + 1}</div>
          <div className={style.company}>
            <img className={style.logo} src={item.company.logo} alt="logo" />
            <div className={style.companyName}>{item.company.name}</div>
          </div>
          <div className={style.compDetail}>{item.compDetail}</div>
          <div className={style.category}>{item.category}</div>
          <div className={style.investment}>{item.investment}억 원</div>
          <div className={style.revenue}>{item.revenue}억 원</div>
          <div className={style.employees}>{item.employees}명</div>
        </div>
      ))}
    </div>
  );
}

export default StartupList;
