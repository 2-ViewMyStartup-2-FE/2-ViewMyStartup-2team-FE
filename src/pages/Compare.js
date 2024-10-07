import compareStyle from "../css/Compare.module.css";
import btnPlus from "../asset/images/btn_plus.png";
import ModalMyCompany from "../component/ModalCompany.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { requestPatch } from "../api/api.js";
import defaultImg from "../asset/images/img_company_default_logo.png";
import ModalAddCompany from "../component/ModalAddCompany.js";
import restart from "../asset/images/ic_restart.png";
import minus from "../asset/images/ic_minus.png";

const ITEM_LIMIT = 5;

function MyCompare() {
  const [isModalOpen, setModalOpen] = useState(false); //나의 기업선택 모달 오픈
  const [isAddModalOpen, setAddModalOpen] = useState(false); //추가 기업 선택 모달 오픈
  const [addCompany, setAddCompany] = useState(false); // 나의기업 선택시 추가기업 섹션 오픈
  const [selectedCompany, setSelectedCompany] = useState(null); //선택된 나의 기업
  const [addSelectedCompany, setAddSelectedCompany] = useState([]); //선택된 추가기업들
  const [allClear, setAllClear] = useState(false); //
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setAddCompany(true);
  };

  const handleAddSelectCompany = (companies) => {
    if (addSelectedCompany.length < 5) {
      setAddSelectedCompany((prev) => [...prev, companies]);
    }
    setAllClear(true);
  };

  const handleCancelSelect = () => {
    setSelectedCompany(null);
    // setAddCompany(false);
  };

  const handleClickAllReset = () => {
    setAddCompany(false);
    setSelectedCompany(false);
    setAddSelectedCompany([]);
    setAllClear(false);
  };

  const handleClickRemove = (id) => {
    setAddSelectedCompany((prev) => {
      const updatedCompanies = prev.filter((company) => company.id !== id);
      if (updatedCompanies.length < ITEM_LIMIT) {
        setErrorMessage(""); // 선택 기업 수가 ITEM_LIMIT 미만일 때 에러 메시지 초기화
      }
      return updatedCompanies; // 업데이트된 리스트 반환
    });
  };

  // const handleCompareCompanies = async () => {
  //   const ids = addSelectedCompany.map(company => company.id).join(',');
  //   const data = { ids, comparedChosenCounts: Array(addSelectedCompany.length).fill('1').join(',') };
  //   console.log('전송할 데이터:', data);
  //   try {
  //     const response = await requestPatch('/comparison/company-compare', data);
  //     console.log('비교 요청 성공:', response.data);
  //     // 추가적인 로직(예: 결과 페이지로 이동 등)을 여기에 추가할 수 있습니다.
  //     navigate(`/compare-result?mycompany=${selectedCompany.id}&selectedcompany=${ids}`);
  //   } catch (error) {
  //     const errorMessage = error.response ? error.response.data : error.message;
  //     console.error('비교 요청 실패:', errorMessage);
  //     alert('비교 요청에 실패했습니다. ' + errorMessage);
  //   }
  // };

  return (
    <>
      <div className={compareStyle.container}>
        <div className={compareStyle.headTheme}>
          <p className={compareStyle.headFont}>나의 기업을 선택해 주세요!</p>
          {allClear && (
            <button
              className={compareStyle.addButton}
              onClick={handleClickAllReset}
            >
              <img
                src={restart}
                alt="restart_IC"
                className={compareStyle.btRestart}
              />
              전체 초기화
            </button>
          )}
        </div>
        <div className={compareStyle.mainSection}>
          {selectedCompany ? (
            <>
              <div className={compareStyle.cancelSection}>
                <p
                  className={compareStyle.cancelFont}
                  onClick={handleCancelSelect}
                >
                  선택 취소
                </p>
              </div>
              <img
                className={compareStyle.logo}
                src={
                  selectedCompany.logo === ""
                    ? defaultImg
                    : selectedCompany.logo
                }
                alt="selected logo"
              />
              <p className={compareStyle.selectName}>{selectedCompany.name}</p>
              <p className={compareStyle.selectCategory}>
                {selectedCompany.category}
              </p>
            </>
          ) : (
            <>
              <img
                className={compareStyle.btnPlus}
                src={btnPlus}
                onClick={openModal}
                alt="btnPlus"
              />
              <p className={compareStyle.contentFont} onClick={openModal}>
                기업추가
              </p>
            </>
          )}
        </div>

        {addCompany && (
          <div className={compareStyle.addSection}>
            <div className={compareStyle.headTheme2}>
              <p className={compareStyle.headFont}>
                어떤기업이 궁금하세요?<span>(최대5개)</span>
              </p>
              <button className={compareStyle.addButton} onClick={openAddModal}>
                기업 추가하기
              </button>
            </div>
            <div>
              <div className={compareStyle.mainSection2}>
                {addSelectedCompany && addSelectedCompany.length > 0 ? (
                  addSelectedCompany.map((company) => (
                    <div key={company.id} className={compareStyle.companyItem}>
                      <div className={compareStyle.minusSection}>
                        <img
                          src={minus}
                          className={compareStyle.companyMinus}
                          alt="minus"
                          onClick={() => handleClickRemove(company.id)} // 수정: 람다 함수로 감싸기
                        />
                      </div>
                      <img
                        className={compareStyle.logo}
                        src={company.logo === "" ? defaultImg : company.logo}
                        alt="selected logo"
                      />
                      <p className={compareStyle.selectName}>{company.name}</p>
                      <p className={compareStyle.selectCategory}>
                        {company.category}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className={compareStyle.defaultFont}>
                    아직 추가한 기업이 없어요,
                    <br />
                    버튼을 눌러 기업을 추가 해 보세요!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={compareStyle.buttonSection}>
        <button
          className={`${compareStyle.button} ${
            addSelectedCompany.length >= 1 && selectedCompany
              ? compareStyle.active
              : ""
          }`}
          // onClick={handleCompareCompanies} // 비교 요청 함수 호출
          onClick={() => {
            if (addSelectedCompany.length >= 1 && selectedCompany) {
              navigate(
                `/compare-result?mycompany=${
                  selectedCompany.id
                }&selectedcompany=${addSelectedCompany
                  .map((company) => company.id)
                  .join(`,`)}`
              );
            }
          }}
          disabled={addSelectedCompany.length < 1}
        >
          기업 비교하기
        </button>
      </div>

      {isModalOpen && (
        <ModalMyCompany
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelectCompany={handleSelectCompany}
        />
      )}

      {isAddModalOpen && (
        <ModalAddCompany
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onSelectAddCompany={handleAddSelectCompany}
          prevSelectedCompany={addSelectedCompany}
          selectedMyCompany={selectedCompany}
          onRemoveCompany={handleClickRemove} // 선택 해제 함수 전달
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </>
  );
}

export default MyCompare;
