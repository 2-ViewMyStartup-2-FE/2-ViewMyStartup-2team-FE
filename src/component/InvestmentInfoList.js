import kebabIcon from "../asset/images/ic_kebab.png";
import Pagination from "./SPagination.js";
import styles from "../css/InvestmentInfoList.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConvertBillion from "../utils/ConvertBillion.js";
import DeleteInvestment from "./DeleteInvestment.js";

export default function InvestmentInfoList() {
  const [investments, setInvestments] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 5; // 한 페이지에 표시할 아이템 수
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 모달 열림 상태
  const [deleteId, setDeleteId] = useState(null); // 삭제할 투자자 ID
  const [inputPassword, setInputPassword] = useState(""); // 비밀번호 상태
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 비밀번호 인증 상태

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
      formattedAmount: ConvertBillion(investor.amount),
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
  const handleOpenEditModal = (id) => {
    console.log(`수정하기 클릭 - 투자자 ID: ${id}`);
    // 여기에 수정 로직 추가
  };

  // 삭제하기 버튼 클릭 처리
  const handleOpenDeleteModal = (id) => {
    console.log(`삭제하기 클릭 - 투자자 ID: ${id}`);
    // 삭제 모달 오픈 및 삭제ID저장
    setActiveDropdown(null);
    setDeleteId(id);
    setShowDeleteModal(true);
    setInputPassword(""); // 비밀번호 필드 초기화
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setIsPasswordVerified(false);
  };

  // 서버에서 확인할 비밀번호를 정의한 함수 (실제 검증 로직을 서버와 통신해야 함)
  const verifyPassword = (inputPassword) => {
    const correctPassword = "codeit"; // 실제 비밀번호 검증 API 호출로 대체 필요
    return inputPassword === correctPassword;
  };

  // 비밀번호 인증 처리
  const handlePasswordVerification = () => {
    if (verifyPassword(inputPassword)) {
      setIsPasswordVerified(true); // 비밀번호 인증 성공
    }
  };

  // 페이지에 맞는 데이터 범위를 가져오는 함수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = investments.slice(indexOfFirstItem, indexOfLastItem); // 해당 페이지에 맞는 데이터 슬라이스

  return (
    <div className={styles.investInfoSection}>
      <div className={styles.investInfoTitle}>
        <h1>View My Startup에서 받은 투자</h1>
        <Link className={styles.investBtn}>기업투자하기</Link>
      </div>
      <div className={styles.investment}>
        총 {ConvertBillion(totalAmount)} 원
      </div>
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
                      <button onClick={() => handleOpenEditModal(investor.id)}>
                        수정하기
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(investor.id)}
                      >
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
        currentPage={currentPage} // 현재 페이지 번호
        setCurrentPage={setCurrentPage}
        totalCount={investments.length} // 전체 데이터 수
        itemLimit={itemsPerPage} // 페이지당 항목 수
      />
      {showDeleteModal && (
        <DeleteInvestment
          investorId={deleteId}
          investments={investments}
          setInvestments={setInvestments}
          onClose={closeDeleteModal}
          inputPassword={inputPassword}
          setInputPassword={setInputPassword}
          isPasswordVerified={isPasswordVerified}
          setIsPasswordVerified={setIsPasswordVerified}
          onVerifyPassword={handlePasswordVerification}
        />
      )}
    </div>
  );
}
