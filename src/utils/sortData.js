const sortData = (data, option) => {
  const sortedData = [...data];
  switch (option) {
    case "investmentHighest":
      return sortedData.sort((a, b) => b.totalInvestment - a.totalInvestment);
    case "investmentLowest":
      return sortedData.sort((a, b) => a.totalInvestment - b.totalInvestment);
    case "revenueHighest":
      return sortedData.sort((a, b) => b.revenue - a.revenue);
    case "revenueLowest":
      return sortedData.sort((a, b) => a.revenue - b.revenue);
    case "employeeHighest":
      return sortedData.sort((a, b) => b.employee - a.employee);
    case "employeeLowest":
      return sortedData.sort((a, b) => a.employee - b.employee);
    default:
      return sortedData;
  }
};
export default sortData;
