import Select from "react-select";
function SortOption() {
  const options = [
    { value: "option1", label: "누적 투자금액 높은순" },
    { value: "option2", label: "누적 투자금액 낮은순" },
    { value: "option3", label: "매출액 높은순" },
    { value: "option3", label: "매출액 낮은순" },
    { value: "option3", label: "고용 인원 많은순" },
    { value: "option3", label: "고용 인원 적은순" }
  ];
  return (
    <div>
      <label htmlFor="react-select">Choose an option:</label>
      <Select
        options={options}
        styles={{
          control: (base) => ({
            ...base,
            border: "2px solid #007bff",
            boxShadow: "none",
            "&:hover": {
              border: "2px solid #0056b3"
            }
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999
          })
        }}
      />
    </div>
  );
}
export default SortOption;
