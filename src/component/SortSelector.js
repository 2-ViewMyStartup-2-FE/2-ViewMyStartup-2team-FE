import Select from "react-select";
import arrow from "../asset/images/img_sort.png"; // 화살표 이미지 임포트

function SortSelector() {
  const isMobile = window.innerWidth <= 743;
  const options = [
    { value: "option1", label: "누적 투자금액 높은순" },
    { value: "option2", label: "누적 투자금액 낮은순" },
    { value: "option3", label: "매출액 높은순" },
    { value: "option4", label: "매출액 낮은순" },
    { value: "option5", label: "고용 인원 많은순" },
    { value: "option6", label: "고용 인원 적은순" }
  ];
  const FONT_SIZE = isMobile ? "1.2rem" : "1.4rem";
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: isMobile ? "16rem" : "16.8rem",
      height: "100%",
      borderRadius: "1rem",
      border: "0.1rem solid #747474",
      boxShadow: "none",
      background: "#131313",
      paddingLeft: "0"
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: FONT_SIZE, // 선택된 값의 글씨 크기 설정
      color: "#D8D8D8",
      //paddingLeft: isMobile ? "0.8rem" : "1rem", // 왼쪽 패딩 추가
      paddingTop: isMobile ? "0.8rem" : "1rem",
      paddingBottom: isMobile ? "0.8rem" : "1rem"
    }),
    option: (provided, state) => ({
      ...provided,
      width: "100%", // 드롭다운 옵션의 너비 설정
      height: isMobile ? "3.8rem" : "4rem",
      fontSize: FONT_SIZE,
      display: "flex", // 플렉스 박스 설정
      alignItems: "center", // 수직 정렬
      color: "#D8D8D8",
      borderTop: state.isFocused
        ? "none"
        : state.data.value === options[0].value
        ? "none"
        : "0.1rem solid #747474", // 첫 번째 옵션의 상단 경계선 없애기
      borderBottom:
        state.data.value === options[options.length - 1].value
          ? "none"
          : "0.1rem solid #747474" // 마지막 옵션의 하단 경계선 없애기
    }),
    indicatorSeparator: () => ({
      display: "none" // 구분선 없애기
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      background: `url(${arrow}) no-repeat center center`, // 화살표 이미지 설정
      backgroundSize: "2.4rem 2.4rem", // 화살표 이미지 크기 조정
      width: "2.4rem", // 화살표 아이콘의 너비
      height: "2.4rem", // 화살표 아이콘의 높이
      marginRight: isMobile ? "0.8rem" : "1rem",
      display: "flex", // 플렉스 박스 설정
      alignItems: "center", // 수직 정렬
      justifyContent: "center" // 수평 정렬
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "1rem",
      border: "0.1rem solid #747474",
      background: "#131313",
      width: isMobile ? "14.6rem" : "16.8rem"
    })
  };

  return (
    <div>
      <label htmlFor="react-select"></label>
      <Select
        options={options}
        styles={customStyles}
        isSearchable={false}
        defaultValue={options[0]} // 기본 선택값 설정
      />
    </div>
  );
}

export default SortSelector;
