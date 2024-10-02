import compareStyle from "../css/Compare.module.css";
import btnPlus from "../asset/images/btn_plus.png";
import ModalMyCompany from "../component/ModalCompany.js";
import { useState } from "react";
import defaultImg from "../asset/images/img_company_default_logo.png";

function MyCompare() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [addCompany, setAddCompany] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null); // 선택한 기업 상태 추가

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleSelectCompany = (company) => {
    setSelectedCompany(company); // 선택한 기업 상태 업데이트
    setAddCompany(true);
  };

  const handleCancelSelect = () => {
    setSelectedCompany(null);
    setAddCompany(false);
  };

  return (
    <>
      <div className={compareStyle.container}>
        <div className={compareStyle.headTheme}>
          <p className={compareStyle.headFont}>나의 기업을 선택해 주세요!</p>
        </div>
        <div className={compareStyle.mainSection}>
          {selectedCompany ? ( // 선택한 기업이 있을 경우
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
                  selectedCompany.logoImage === ""
                    ? defaultImg
                    : selectedCompany.logoImage
                }
                alt="selected logo"
              />
              <p className={compareStyle.selectName}>{selectedCompany.name}</p>
              <p className={compareStyle.selectCategory}>{selectedCompany.category}</p>
            </>
          ) : (
            <>
              <img src={btnPlus} onClick={openModal} alt="btnPlus" />
              <p className={compareStyle.contentFont} onClick={openModal}>
                기업추가
              </p>
            </>
          )}
        </div>

        {addCompany && (
          <div className={compareStyle.addSection}>
            <div className={compareStyle.headTheme2}>
              <p className={compareStyle.headFont}> 어떤기업이 궁금하세요?</p>
              <button className={compareStyle.addButton}>기업 추가하기</button>
            </div>
            <div>
              <div className={compareStyle.mainSection2}>
                <p>
                  아직 추가한 기업이 없어요,
                  <br />
                  버튼을 눌러 기업을 추가 해 보세요!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={compareStyle.buttonSection}>
        <button className={compareStyle.button}>기업 비교하기</button>
      </div>

      {isModalOpen && (
        <ModalMyCompany
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelectCompany={handleSelectCompany}
        />
      )}
    </>
  );
}

export default MyCompare;
