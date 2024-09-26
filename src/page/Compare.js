import compareStyle from "./Compare.module.css";
import btnPlus from "../asset/image/btn_plus.png";

function MyCompare() {
  return (
    <>
      <div className={compareStyle.container}>
        <div className={compareStyle.headTheme}>
          <p className={compareStyle.headFont}>나의 기업을 선택해 주세요!</p>
        </div>
        <div className={compareStyle.mainSection}>
          <div className={compareStyle.content}>
            <img src={btnPlus} alt="btnPlus" />
            <p className={compareStyle.contentFont}>기업추가</p>
          </div>
        </div>
        <div className={compareStyle.addSection}>
          <div className={compareStyle.headTheme}>
            <p className={compareStyle.headFont}> 어떤기업이 궁금하세요?</p>
            <button>기업 추가하기</button>
          </div>
        </div>
      </div>
      <div className={compareStyle.buttonSection}>
        <button className={compareStyle.button}>기업 비교하기</button>
      </div>
    </>
  );
}

export default MyCompare;
