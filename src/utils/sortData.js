const sortData = (data, option) => {
  const sortedData = [...data];
  switch (option) {
    case "누적 투자금액 높은순":
      return sortedData.sort((a, b) => b.totalInvestment - a.totalInvestment);
    case "누적 투자금액 낮은순":
      return sortedData.sort((a, b) => a.totalInvestment - b.totalInvestment);
    case "매출액 높은순":
      return sortedData.sort((a, b) => b.revenue - a.revenue);
    case "매출액 낮은순":
      return sortedData.sort((a, b) => a.revenue - b.revenue);
    case "고용 인원 많은순":
      return sortedData.sort((a, b) => b.employee - a.employee);
    case "고용 인원 적은순":
      return sortedData.sort((a, b) => a.employee - b.employee);
    default:
      return sortedData;
  }
};
export default sortData;
