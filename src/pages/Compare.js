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
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isAddModalOpen,
    openModal: openAddModal,
    closeModal: closeAddModal,
  } = useModal();

  const [addCompany, setAddCompany] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [addSelectedCompany, setAddSelectedCompany] = useState([]);
  const [allClear, setAllClear] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

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
        setErrorMessage("");
      }
      return updatedCompanies;
    });
  };

  const ids = addSelectedCompany.map((company) => company.id);

  const handlePatchRequest = async () => {
    const comparisonUrl = `/comparison/${ids.join(",")}/company-compare`;
    const myCompareUrl = `/comparison/${selectedCompany.id}/my-compare`;

    try {
      // 첫 번째 PATCH 요청 (다중 ids)
      await requestPatch(comparisonUrl, null);

      // 두 번째 PATCH 요청 (단일 id)
      await requestPatch(myCompareUrl, null);

      if (addSelectedCompany.length >= 1 && selectedCompany) {
        navigate(
          `/compare-result?mycompany=${
            selectedCompany.id
          }&selectedcompany=${ids.join(",")}`
        );
      }
    } catch (error) {
      console.error("Error while sending patch request:", error);
      setErrorMessage("비교 요청 중 오류가 발생했습니다.");
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
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
                어떤기업이 궁금하세요?<span>(최대5개)</span>
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
                          onClick={() => handleClickRemove(company.id)}
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
          onClick={handlePatchRequest}
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
          addSelectedCompany={addSelectedCompany}
        />
      )}

      {isAddModalOpen && (
        <ModalAddCompany
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onSelectAddCompany={handleAddSelectCompany}
          prevSelectedCompany={addSelectedCompany}
          selectedMyCompany={selectedCompany}
          onRemoveCompany={handleClickRemove}
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
