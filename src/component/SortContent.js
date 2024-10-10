import ListSort from "./ListSort.js";

export default function SortContent({ sortOption, defaultOption, onSelect }) {
  const investOption = [
    { label: "View My Startup 투자 금액 높은순", value: "virtualInvestHighest" },
    { label: "View My Startup 투자 금액 낮은순", value: "virtualInvestLowest" },
    { label: "실제 누적 투자 금액 높은순", value: "actualInvestHighest" },
    { label: "실제 누적 투자 금액 낮은순", value: "actualInvestLowest" }
  ];

  const compareOption = [
    { label: "나의 기업 선택 횟수 높은순", value: "myCountHighest" },
    { label: "나의 기업 선택 횟수 낮은순", value: "myCountLowest" },
    { label: "비교 기업 선택 횟수 높은순", value: "comparedHighest" },
    { label: "비교 기업 선택 횟수 낮은순", value: "comparedLowest" }
  ];

  const listOption = [
    { label: "누적 투자금액 높은순", value: "investmentHighest" },
    { label: "누적 투자금액 낮은순", value: "investmentLowest" },
    { label: "매출액 높은순", value: "revenueHighest" },
    { label: "매출액 낮은순", value: "revenueLowest" },
    { label: "고용 인원 많은순", value: "employeeHighest" },
    { label: "고용 인원 적은순", value: "employeeLowest" }
  ];

  const optionsGroup = {
    invest: investOption,
    compare: compareOption,
    list: listOption
  };

  const defaultOptions = {
    invest: investOption[0].label,
    compare: compareOption[0].label,
    list: listOption[0].label
  };

  const getOptions = () => optionsGroup[sortOption] || listOption;

  const handleSelect = (selectedOption) => {
    const selected = getOptions().find(option => option.label === selectedOption);
    if (selected) {
      onSelect(selected.value); 
    }
  };

  return (
    <div>
      <ListSort
        options={getOptions().map(option => option.label)}  // 한글 label만 전달
        defaultOption={defaultOptions[sortOption] || defaultOption}
        onSelect={handleSelect}
      />
    </div>
  );
}