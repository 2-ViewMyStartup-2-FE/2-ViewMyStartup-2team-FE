import styles from "../css/InvestmentForm.module.css";
import toggle from "../asset/images/toggle.png";

function getFieldConfig(type, isVisible) {
  switch (type) {
    case "name": //type에 따라 클래스, input태그의 type, 메시지 설정
      return {
        frame: styles.other,
        label: "투자자 이름",
        inputType: "text",
        message: "투자자 이름을 입력해 주세요"
      };
    case "amount":
      return {
        frame: styles.other,
        label: "투자 금액",
        inputType: "text",
        message: "투자 금액을 입력해 주세요"
      };
    case "comment":
      return {
        frame: styles.comment,
        label: "투자 코멘트",
        inputType: "text",
        message: "투자에 대한 코멘트를 입력해 주세요"
      };
    case "password":
    case "confirm":
      return {
        frame: styles.other,
        label: type === "password" ? "비밀번호" : "비밀번호 확인",
        inputType: isVisible ? "text" : "password",
        message:
          type === "password"
            ? "비밀번호를 입력해주세요"
            : "비밀번호를 다시 한 번 입력해주세요"
      };
    default:
      return {
        frame: styles.other,
        label: "기본 필드",
        inputType: "text",
        message: "기본 메시지를 입력하세요"
      };
  }
}
function InvestmentForm({ type = "name", onBlur, isVisible, onToggle }) {
  const {
    frame: FRAME,
    label: LABEL,
    inputType: INPUTTYPE,
    message: MESSAGE
  } = getFieldConfig(type, isVisible);
  return (
    <div className={FRAME}>
      <label className={styles.label}>{LABEL}</label>
      {type === "comment" ? ( //comment인경우에 textarea를 반환
        <textarea
          className={styles.commentInput}
          placeholder={MESSAGE}
          onBlur={onBlur}
        />
      ) : (
        <div className={styles.inputContainer}>
          <input //comment가 아닌 경우에는 input태그를 반환
            className={styles.otherInput}
            placeholder={MESSAGE}
            type={INPUTTYPE}
            onBlur={onBlur}
          />
          {(type === "password" || type === "confirm") && ( //비밀번호계열 인풋은 토글 버튼추가
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={onToggle}
            >
              <img src={toggle} alt="토글이미지" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default InvestmentForm;
