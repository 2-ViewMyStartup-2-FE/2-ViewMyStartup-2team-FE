import kebabIcon from "../asset/images/ic_kebab.png";
import Pagination from "./Pagination.js";
import styles from "../css/InvestmentInfoList.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// 금액의 '억'을 숫자로 변환하는 함수
// const parseAmount = (amountStr) => {
//   return parseInt(amountStr.replace("억", ""), 10); // "10억" -> 10
// };

// 숫자를 "억" 단위로 변환하는 함수
const formatAmount = (amount) => {
  const billion = 100000000; // 1억을 나타내는 숫자
  return `${(amount / billion).toFixed(0)}억`; // 억 단위로 나누고 소수점 제거
};

export default function InvestmentInfoList() {
  const [investments, setInvestments] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 5; // 한 페이지에 표시할 아이템 수

  // useEffect로 데이터를 불러오기
  useEffect(() => {
    // 예시 데이터 (API를 사용할 경우 fetch 또는 axios로 대체)
    const fetchedData = [
      {
        id: 1,
        name: "강인수",
        amount: "1000000000",
        comment: "코드잇은 정말 훌륭한 기업입니다!",
      },
      {
        id: 2,
        name: "이유지",
        amount: "900000000",
        comment: "코드잇의 성장 가능성은 무궁무진합니다.",
      },
      {
        id: 3,
        name: "임대현",
        amount: "800000000",
        comment: "최고의 기업 코드잇!",
      },
      {
        id: 4,
        name: "신민성",
        amount: "700000000",
        comment: "코드잇의 집중 분야는 무궁무진합니다.",
      },
      {
        id: 5,
        name: "이동현",
        amount: "600000000",
        comment: "교육업계의 라이징 스타 코드잇을 신뢰합니다.",
      },
      { id: 6, name: "김영수", amount: "500000000", comment: "투자 코멘트 6" },
      { id: 7, name: "박수현", amount: "400000000", comment: "투자 코멘트 7" },
      { id: 8, name: "한지민", amount: "300000000", comment: "투자 코멘트 8" },
    ];

    // 금액(amount)을 기준으로 내림차순으로 정렬
    const sortedData = fetchedData.sort((a, b) => b.amount - a.amount);

    // 정렬된 데이터에 순위를 부여
    const rankedData = sortedData.map((investor, index) => ({
      ...investor,
      rank: `${index + 1}위`, // index가 0부터 시작하므로 +1
      formattedAmount: formatAmount(investor.amount),
    }));

    // 투자 총합 계산
    const total = rankedData.reduce(
      (sum, investor) => sum + parseInt(investor.amount),
      0
    );

    setInvestments(rankedData); // 상태에 저장
    setTotalAmount(total); // 총 투자 금액 상태 업데이트
  }, []);

  // 드롭다운 토글 함수
  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null); // 이미 열린 경우 닫기
    } else {
      setActiveDropdown(id); // 새로운 아이디로 열기
    }
  };

  // 수정하기 버튼 클릭 처리
  const handleEdit = (id) => {
    console.log(`수정하기 클릭 - 투자자 ID: ${id}`);
    // 여기에 수정 로직 추가
  };

  // 삭제하기 버튼 클릭 처리
  const handleDelete = (id) => {
    console.log(`삭제하기 클릭 - 투자자 ID: ${id}`);
    // 여기에 삭제 로직 추가
  };

  // 페이지에 맞는 데이터 범위를 가져오는 함수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = investments.slice(indexOfFirstItem, indexOfLastItem); // 해당 페이지에 맞는 데이터 슬라이스

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.investInfoSection}>
      <div className={styles.investInfoTitle}>
        <h1>View My Startup에서 받은 투자</h1>
        <Link className={styles.investBtn}>기업투자하기</Link>
      </div>
      <div className={styles.investment}>총 {formatAmount(totalAmount)} 원</div>
      <div className={styles.investInfo}>
        <div className={styles.investDetailTitle}>
          <h1>투자자 이름</h1>
          <h1>순위</h1>
          <h1>투자 금액</h1>
          <h1>투자 코멘트</h1>
        </div>
        <div>
          {currentItems.map((investor) => (
            <div className={styles.investDetail} key={investor.id}>
              <h1>{investor.name}</h1>
              <h1>{investor.rank}</h1>
              <h1>{investor.formattedAmount}</h1>
              <h1>{investor.comment}</h1>
              <div>
                {/* Kebab 아이콘 */}
                <div className={styles.dropdown}>
                  <img
                    src={kebabIcon}
                    alt="kebabIcon"
                    onClick={() => toggleDropdown(investor.id)}
                  />
                  {/* 드롭다운 메뉴 */}
                  {activeDropdown === investor.id && (
                    <div className={styles.dropdownMenu}>
                      <button onClick={() => handleEdit(investor.id)}>
                        수정하기
                      </button>
                      <button onClick={() => handleDelete(investor.id)}>
                        삭제하기
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        totalItems={investments.length} // 전체 데이터 수
        itemsPerPage={itemsPerPage} // 페이지당 항목 수
        currentPage={currentPage} // 현재 페이지 번호
        onPageChange={handlePageChange} // 페이지 변경 함수
      />
    </div>
  );
}
