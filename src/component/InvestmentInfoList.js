import kebabIcon from "../asset/images/ic_kebab.png";
import Pagination from "./SPagination.js";
import styles from "../css/InvestmentInfoList.module.css";
import { useEffect, useState } from "react";
import ConvertBillion from "../utils/ConvertBillion.js";
import DeleteInvestment from "./DeleteInvestment.js";
import EditInvestment from "./EditInvestment.js";

export default function InvestmentInfoList({ data }) {
  const [investments, setInvestments] = useState([]); // 투자 데이터를 상태로 관리
  const [activeDropdown, setActiveDropdown] = useState(null); // 드롭다운 열림 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5; // 페이지 당 표시할 아이템 수
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 상태
  const [showEditModal, setShowEditModal] = useState(false); // 수정 모달 상태
  const [selectedInvestment, setSelectedInvestment] = useState(null); // 선택된 투자자 데이터

  // useEffect로 투자 데이터를 투자 금액 순서로 정렬
  useEffect(() => {
    if (data && data.Investments) {
      const sortedInvestments = data.Investments.sort(
        (a, b) => b.amount - a.amount
      );
      const rankedInvestments = sortedInvestments.map((investment, index) => ({
        ...investment,
        rank: `${index + 1}위`, // 순위 추가
        formattedAmount: ConvertBillion(investment.amount), // 금액 포맷팅
      }));
      setInvestments(rankedInvestments); // 상태에 저장
    }
  }, [data]); // data가 변경될 때마다 실행

  // 현재 페이지에 맞는 데이터를 슬라이스
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = investments.slice(indexOfFirstItem, indexOfLastItem);

  // 드롭다운 토글 함수
  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  // 수정 모달 열기
  const handleOpenEditModal = (id) => {
    const selected = investments.find((investor) => investor.id === id);
    setSelectedInvestment(selected);
    setShowEditModal(true);
    setActiveDropdown(null); // 드롭다운 닫기
  };

  // 삭제 모달 열기
  const handleOpenDeleteModal = (id) => {
    const selected = investments.find((investor) => investor.id === id);
    setSelectedInvestment(selected);
    setShowDeleteModal(true);
    setActiveDropdown(null); // 드롭다운 닫기
  };

  // 모달 닫기
  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedInvestment(null);
  };

  // 비밀번호 검증 함수
  const verifyPassword = (inputPassword, investmentId) => {
    const investment = investments.find((inv) => inv.id === investmentId);
    if (!investment) return false;
    return investment.password === inputPassword;
  };

  return (
    <div className={styles.investInfoSection}>
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
              <h1>{investor.investorName}</h1>
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
          investment={selectedInvestment}
          onClose={closeModal}
          setInvestments={setInvestments}
          verifyPassword={verifyPassword} // 비밀번호 검증 함수 전달
        />
      )}
      {showEditModal && (
        <EditInvestment
          investment={selectedInvestment}
          myCompany={{
            id: data.id,
            name: data.name,
            logo: data.logo,
            category: data.category,
          }} // 필요한 기업 정보만 전달
          onClose={closeModal}
          setInvestments={setInvestments}
          verifyPassword={verifyPassword} // 비밀번호 검증 함수 전달
        />
      )}
    </div>
  );
}
