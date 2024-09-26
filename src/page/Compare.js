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
          <img src={btnPlus} alt="btnPlus" />
          <p className={compareStyle.contentFont}>기업추가</p>
        </div>

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
      </div>
      <div className={compareStyle.buttonSection}>
        <button className={compareStyle.button}>기업 비교하기</button>
      </div>
    </>
  );
}

export default MyCompare;
