import compareStyle from "../css/Compare.module.css";
import btnPlus from "../asset/images/btn_plus.png";
import ModalMyCompany from "../component/ModalCompany.js";
import { useState } from "react";
import defaultImg from "../asset/images/img_company_default_logo.png";
import ModalAddCompany from "../component/ModalAddCompany.js";
import restart from "../asset/images/ic_restart.png"
import minus from "../asset/images/ic_minus.png"

function MyCompare() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); //새로운 모달 상태 추가
  const [addCompany, setAddCompany] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null); // 선택한 기업 상태 추가
  const [addSelectedCompany, setAddSelectedCompany] = useState([]);
  const [allClear, setAllClear] = useState(false);

  const openModal = () => {
    //나의 기업 추가 모달
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openAddModal = () => {
    //기업추가모달
    setAddModalOpen(true);
  };
  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company); // 선택한 기업 상태 업데이트
    setAddCompany(true);
  };

  const handleAddSelectCompany = (companies) => {
    if (addSelectedCompany.length < 5) {
      setAddSelectedCompany((prev) => [...prev, companies]);}
    console.log('추가된기업',addSelectedCompany)
    setAllClear(true);
  };

  const handleCancelSelect = () => {
    setSelectedCompany(null);
    setAddCompany(false);
  };

  const handleClickAllReset = () =>{
    setAddCompany(false);
    setSelectedCompany(false);
    setAddSelectedCompany([]);
    setAllClear(false);
  };

  const handleClickRemove = (id) => () => {
    setAddSelectedCompany(addSelectedCompany.filter((company) => company.id !== id));
    if(addSelectedCompany.length === 1){
      setAddCompany(false);
    }
  };

  return (
    <>
      <div className={compareStyle.container}>
        <div className={compareStyle.headTheme}>
          <p className={compareStyle.headFont}>나의 기업을 선택해 주세요!</p>
          {allClear && <button className={compareStyle.addButton} onClick={handleClickAllReset} >
            <img src={restart} alt="restart_IC" className={compareStyle.btRestart} />
                전체 초기화
              </button>}
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
              <p className={compareStyle.headFont}> 어떤기업이 궁금하세요?</p>
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
                      <img src={minus} className={compareStyle.companyMinus} alt='minus' onClick={handleClickRemove(company.id)} />
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
                  <>
                    <p className={compareStyle.defaultFont}>
                      아직 추가한 기업이 없어요,
                      <br />
                      버튼을 눌러 기업을 추가 해 보세요!
                    </p>
                  </>
                )}
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

      {isAddModalOpen && ( // 새로운 모달 조건 추가
        <ModalAddCompany
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onSelectAddCompany={handleAddSelectCompany}
          prevSelectedCompany={addSelectedCompany}
        />
      )}
    </>
  );
}

export default MyCompare;
