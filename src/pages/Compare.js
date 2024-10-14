import style from "../css/Compare.module.css";
import btnPlus from "../asset/images/btn_plus.png";
import ModalMyCompany from "../component/ModalMyCompany.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPatch } from "../api/api.js";
import defaultImg from "../asset/images/img_company_default_logo.png";
import ModalAddCompany from "../component/ModalAddCompany.js";
import restart from "../asset/images/ic_restart.png";
import minus from "../asset/images/ic_minus.png";
import ErrorModal from "../component/ErrorModal.js";
import useModal from "../hooks/useModal.js";

const ITEM_LIMIT = 5;

function MyCompare() {
  const { isOpen: isModalOpen, openModal, closeModal } = useModal(); //나의 기업선택 모달 오픈 훅
  const {
    isOpen: isAddModalOpen,
    openModal: openAddModal,
    closeModal: closeAddModal
  } = useModal(); //추가 기업 선택 모달 오픈 훅

  const [addCompany, setAddCompany] = useState(false); // 나의기업 선택시 추가기업 섹션 오픈
  const [selectedCompany, setSelectedCompany] = useState(null); //선택된 나의 기업
  const [addSelectedCompany, setAddSelectedCompany] = useState([]); //선택된 추가기업들
  const [allClear, setAllClear] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false); // 에러 모달 상태 추가

  const navigate = useNavigate();

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
    if (addSelectedCompany.length === 0) {
      setAddCompany(false);
    }
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

  const ids = addSelectedCompany.map((company) => company.id);

  const handlePatchRequest = async () => {
    const comparisonUrl = `/comparison/${ids.join(",")}/company-compare`; // ids를 쉼표로 구분해서 URL에 포함
    const myCompareUrl = `/comparison/${selectedCompany.id}/my-compare`; // 단일 id로 URL 생성

    try {
      // 첫 번째 PATCH 요청 (다중 ids)
      await requestPatch(comparisonUrl, null); // 데이터가 없으므로 두 번째 인자는 null로
      console.log(`첫 번째 PATCH 요청 성공: ${comparisonUrl}`);
      // 두 번째 PATCH 요청 (단일 id)
      await requestPatch(myCompareUrl, null); // 단일 id에 대한 PATCH 요청
      console.log(`두 번째 PATCH 요청 성공: ${myCompareUrl}`);

      if (addSelectedCompany.length >= 1 && selectedCompany) {
        navigate(
          `/compare-result?mycompany=${
            selectedCompany.id
          }&selectedcompany=${ids.join(",")}`
        );
      }
    } catch (error) {
      console.error("Error while sending patch request:", error);
      setErrorMessage("비교 요청 중 오류가 발생했습니다."); // 에러 메시지 설정
      setShowErrorModal(true); // 에러 모달 열기
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false); // 에러 모달 닫기
    setErrorMessage(""); // 에러 메시지 초기화
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.headTheme}>
          <p className={style.headFont}>나의 기업을 선택해 주세요!</p>
          {allClear && addSelectedCompany.length >= 1 && (
            <button className={style.addButton} onClick={handleClickAllReset}>
              <img src={restart} alt="restart_IC" className={style.btRestart} />
              전체 초기화
            </button>
          )}
        </div>
        <div className={style.mainSection}>
          {selectedCompany ? (
            <>
              <div className={style.cancelSection}>
                <p className={style.cancelFont} onClick={handleCancelSelect}>
                  선택 취소
                </p>
              </div>
              <img
                className={style.logo}
                src={
                  selectedCompany.logo === ""
                    ? defaultImg
                    : selectedCompany.logo
                }
                alt="selected logo"
              />
              <p className={style.selectName}>{selectedCompany.name}</p>
              <p className={style.selectCategory}>{selectedCompany.category}</p>
            </>
          ) : (
            <>
              <img
                className={style.btnPlus}
                src={btnPlus}
                onClick={openModal}
                alt="btnPlus"
              />
              <p className={style.contentFont} onClick={openModal}>
                기업추가
              </p>
            </>
          )}
        </div>

        {addCompany && (
          <div className={style.addSection}>
            <div className={style.headTheme2}>
              <p className={style.headFont}>
                어떤기업이 궁금하세요?
                <span className={style.span}>(최대5개)</span>
              </p>
              <button
                className={`${style.addButton} ${
                  addSelectedCompany.length === 5 ? style.maxAdd : ""
                }`}
                onClick={openAddModal}
              >
                기업 추가하기
              </button>
            </div>
            <div>
              <div className={style.mainSection2}>
                {addSelectedCompany && addSelectedCompany.length > 0 ? (
                  addSelectedCompany.map((company) => (
                    <div key={company.id} className={style.companyItem}>
                      <div className={style.minusSection}>
                        <img
                          src={minus}
                          className={style.companyMinus}
                          alt="minus"
                          onClick={() => handleClickRemove(company.id)} // 수정: 람다 함수로 감싸기
                        />
                      </div>
                      <img
                        className={style.logo}
                        src={company.logo === "" ? defaultImg : company.logo}
                        alt="selected logo"
                      />
                      <p className={style.selectName}>{company.name}</p>
                      <p className={style.selectCategory}>{company.category}</p>
                    </div>
                  ))
                ) : (
                  <p className={style.defaultFont}>
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
      <div className={style.buttonSection}>
        <button
          className={`${style.button} ${
            addSelectedCompany.length >= 1 && selectedCompany
              ? style.active
              : ""
          }`}
          onClick={handlePatchRequest} // 비교 요청 함수 호출
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

      {showErrorModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalContainer}>
            (
            <ErrorModal
              onClose={handleCloseErrorModal}
              errorMessage={errorMessage}
              handleErrorConfirmBtn={handleCloseErrorModal}
              compareClassName={style.errorModal}
            />
            )
          </div>
        </div>
      )}
    </>
  );
}

export default MyCompare;
