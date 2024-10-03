import kebabIcon from "../asset/images/ic_kebab.png";
import Pagination from "./SPagination.js";
import styles from "../css/InvestmentInfoList.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConvertBillion from "../utils/ConvertBillion.js";
import DeleteInvestment from "./DeleteInvestment.js";
import EditInvestment from "./EditInvestment.js";

const myComanyMockData = {
  name: "코드잇",
  logo: "https://logo-resources.thevc.kr/organizations/200x200/485bb55e3da6f0af944776691c82f49d7131836de10d5718ec79242d44edfce4_1585722287000593.jpg",
  rank: 14,
  description: "코드잇은 온라인 교육",
  category: "에듀테크",
  totalInvestment: 14000000000,
  revenue: 5000000000,
  employee: 68,
};

export default function InvestmentInfoList({ MYCOMPANY = myComanyMockData }) {
  const [investments, setInvestments] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 5; // 한 페이지에 표시할 아이템 수
  const [showDeleteModal, setShowDeleteModal] = useState(false); // DeleteModal 열림/닫힘 상태
  const [showEditeModal, setShowEditModal] = useState(false); // DeleteModal 열림/닫힘 상태
  const [EditDeleteId, setEditDeleteId] = useState(null); // 삭제할 투자자 ID
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 비밀번호 인증 상태
  const [inputData, setInputData] = useState({
    name: "",
    amount: "",
    comment: "",
  });

  // useEffect로 데이터를 불러오기
  useEffect(() => {
    // 예시 데이터 (API를 사용할 경우 fetch 또는 axios로 대체)
    const fetchedData = [
      {
        id: 1,
        name: "강인수",
        amount: "1000000000",
        comment: "코드잇은 정말 훌륭한 기업입니다!",
        password: "qwe",
      },
      {
        id: 2,
        name: "이유지",
        amount: "900000000",
        comment: "코드잇의 성장 가능성은 무궁무진합니다.",
        password: "asd",
      },
      {
        id: 3,
        name: "임대현",
        amount: "800000000",
        comment: "최고의 기업 코드잇!",
        password: "asd",
      },
      {
        id: 4,
        name: "신민성",
        amount: "700000000",
        comment: "코드잇의 집중 분야는 무궁무진합니다.",
        password: "asd",
      },
      {
        id: 5,
        name: "이동현",
        amount: "600000000",
        comment: "교육업계의 라이징 스타 코드잇을 신뢰합니다.",
        password: "asd",
      },
      {
        id: 6,
        name: "김영수",
        amount: "500000000",
        comment: "투자 코멘트 6",
        password: "asd",
      },
      {
        id: 7,
        name: "박수현",
        amount: "400000000",
        comment: "투자 코멘트 7",
        password: "asd",
      },
      {
        id: 8,
        name: "한지민",
        amount: "300000000",
        comment: "투자 코멘트 8",
        password: "asd",
      },
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

  useEffect(() => {
    // 수정된 investments 상태를 기반으로 투자 총액을 다시 계산
    const total = investments.reduce(
      (sum, investor) => sum + parseInt(investor.amount),
      0
    );
    setTotalAmount(total); // 총 투자 금액 업데이트
  }, [investments]); // investments가 변경될 때마다 호출

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
    const selectedInvestment = investments.find(
      (investment) => investment.id === id
    );

    setInputData({
      name: selectedInvestment.name,
      amount: selectedInvestment.amount,
      comment: selectedInvestment.comment,
    });

    setActiveDropdown(null);
    setEditDeleteId(id);
    setShowEditModal(true);
  };

  // 수정 내용을 저장하는 함수
  const handleSaveEdit = (updatedInvestment) => {
    const updatedData = {
      ...updatedInvestment,
      amount: parseInt(updatedInvestment.amount, 10), // 금액을 숫자로 변환
      formattedAmount: ConvertBillion(updatedInvestment.amount), // 포맷된 금액 업데이트
    };

    // 투자 데이터를 수정한 후에 다시 정렬 및 순위 재계산
    const updatedInvestments = investments.map((investment) =>
      investment.id === EditDeleteId
        ? { ...investment, ...updatedData } // 수정된 금액과 포맷된 금액 함께 업데이트
        : investment
    );

    // 금액을 기준으로 내림차순으로 정렬
    const sortedInvestments = updatedInvestments.sort(
      (a, b) => b.amount - a.amount
    );

    // 순위를 다시 부여
    const rankedInvestments = sortedInvestments.map((investor, index) => ({
      ...investor,
      rank: `${index + 1}위`, // index가 0부터 시작하므로 +1
      formattedAmount: ConvertBillion(investor.amount),
    }));

    // 상태 업데이트
    setInvestments(rankedInvestments);
    setShowEditModal(false); // 수정 완료 후 모달 닫기
  };

  // 삭제하기 버튼 클릭 처리
  const handleOpenDeleteModal = (id) => {
    console.log(`삭제하기 클릭 - 투자자 ID: ${id}`);
    // 삭제 모달 오픈 및 삭제ID저장
    setActiveDropdown(null);
    setEditDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setIsPasswordVerified(false);
  };

  // 서버에서 확인할 비밀번호를 정의한 함수 (실제 검증 로직을 서버와 통신해야 함)
  const verifyPassword = (inputPassword) => {
    console.log("z", inputPassword);
    const correctPassword = "codeit"; // 실제 비밀번호 검증 API 호출로 대체 필요
    return inputPassword === correctPassword;
  };

  // 비밀번호 인증 처리
  const handlePasswordVerification = (inputPassword) => {
    if (verifyPassword(inputPassword)) {
      setIsPasswordVerified(true); // 비밀번호 인증 성공
      console.log("Password Verified: ", inputPassword);
    } else {
      setIsPasswordVerified(false);
      console.log("Password Verification Failed");
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
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
          investorId={EditDeleteId}
          investments={investments}
          setInvestments={setInvestments}
          onClose={closeDeleteModal}
          isPasswordVerified={isPasswordVerified}
          setIsPasswordVerified={setIsPasswordVerified}
          onVerifyPassword={handlePasswordVerification}
        />
      )}
      {showEditeModal && (
        <EditInvestment
          investmentData={inputData} // 선택한 투자자 데이터를 전달
          onSaveEdit={handleSaveEdit} // 수정 내용을 저장하는 함수
          closeEditModal={closeDeleteModal} // 모달을 닫는 함수
          myCompany={MYCOMPANY}
          onVerifyPassword={handlePasswordVerification}
          isPasswordVerified={isPasswordVerified}
        />
      )}
    </div>
  );
}
