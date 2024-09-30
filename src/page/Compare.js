import style from "../css/Compare.module.css";
import btnPlus from "../asset/images/btn_plus.png";
import ModalMyCompany from "../component/ModalCompany.js";
import { useState } from "react";

function MyCompare() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCompany, setAddcompany] =useState(false);
  
  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    console.log("모달이 닫힙니다."); // 로그 추가
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.headTheme}>
          <p className={style.headFont}>나의 기업을 선택해 주세요!</p>
        </div>
        <div className={style.mainSection}>
          <img src={btnPlus} alt="btnPlus" onClick={openModal} />
          <p className={style.contentFont} onClick={openModal}>
            기업추가
          </p>
        </div>

         
      {addCompany && <div className={style.addSection}>
          <div className={style.headTheme2}>
            <p className={style.headFont}> 어떤기업이 궁금하세요?</p>
            <button className={style.addButton}>기업 추가하기</button>
          </div>
          <div>
            <div className={style.mainSection2}>
              <p>
                아직 추가한 기업이 없어요,
                <br />
                버튼을 눌러 기업을 추가 해 보세요!
              </p>
            </div>
          </div>
        </div>}
      </div>
      <div className={style.buttonSection}>
        <button className={style.button}>기업 비교하기</button>
      </div>
      <ModalMyCompany isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default MyCompare;
