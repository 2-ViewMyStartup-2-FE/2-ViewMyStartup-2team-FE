import ListSort from './ListSort';

export default function SortContent({ sortOption, defaultOption, onSelect }) {
  const investOption = [
    'View My Startup 투자 금액 높은순',
    'View My Startup 투자 금액 낮은순',
    '실제 누적 투자 금액 높은순',
    '실제 누적 투자 금액 낮은순'
  ];

  const compareOption = [
    '나의 기업 선택 횟수 높은순',
    '나의 기업 선택 횟수 낮은순',
    '실제 누적 투자 금액 높은순',
    '실제 누적 투자 금액 낮은순'
  ];

  const listOption = [
    '누적 투자금액 높은순',
    '누적 투자금액 낮은순',
    '매출액 높은순',
    '매출액 낮은순',
    '고용 인원 많은순',
    '고용 인원 적은순'
  ];

  const defaultOptions = {
    invest: investOption[0],
    compare: compareOption[0],
    list: listOption[0],
  };

  function getOptions() {
    if (sortOption === 'invest') {
      return investOption;
    } else if (sortOption === 'compare') {
      return compareOption;
    } else {
      return listOption;
    }
  }

  return (
    <div>
      <ListSort 
        options={getOptions()} 
        defaultOption={defaultOptions[sortOption] || defaultOption} 
        onSelect={onSelect}
        />
    </div>
  );
}
