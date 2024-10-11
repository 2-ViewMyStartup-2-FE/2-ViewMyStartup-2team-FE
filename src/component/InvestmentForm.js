import styles from "../css/InvestmentForm.module.css";
import toggle from "../asset/images/toggle.png";
import toggleOff from "../asset/images/closed-eyes.png";

function getFieldConfig(type, isVisible, className) {
  switch (type) {
    case "name": //type에 따라 클래스, input태그의 type, 메시지 설정
      return {
        frame: `${styles.other} ${className}`,
        label: "투자자 이름",
        inputType: "text",
        message: "투자자 이름을 입력해 주세요"
      };
    case "amount":
      return {
        frame: `${styles.other} ${className}`,
        label: "투자 금액",
        inputType: "text",
        message: "투자 금액을 입력해 주세요"
      };
    case "comment":
      return {
        frame: `${styles.comment} ${className}`,
        label: "투자 코멘트",
        inputType: "text",
        message: "투자에 대한 코멘트를 입력해 주세요"
      };
    case "password":
    case "confirm":
      return {
        frame: `${styles.other} ${className}`,
        label: type === "password" ? "비밀번호" : "비밀번호 확인",
        inputType: isVisible ? "text" : "password",
        message:
          type === "password"
            ? "비밀번호를 입력해주세요"
            : "비밀번호를 다시 한 번 입력해주세요"
      };
    default:
      return {
        frame: `${styles.other} ${className}`,
        label: "기본 필드",
        inputType: "text",
        message: "기본 메시지를 입력하세요"
      };
  }
}
function InvestmentForm({
  type = "name",
  onChange,
  isVisible,
  onToggle,
  className,
  errorMessage,
  mode,
  value = "" // value 추가
}) {
  const {
    frame: FRAME,
    label: LABEL,
    inputType: INPUTTYPE,
    message: MESSAGE
  } = getFieldConfig(type, isVisible, className);

  // mode가 edit일 경우에만 초기값을 설정, 그렇지 않으면 입력 필드를 자유롭게 할당
  const inputValue = mode === "edit" ? value : undefined;
  const toggleImg = isVisible ? toggle : toggleOff;
  return (
    <div className={FRAME}>
      <label htmlFor={type} className={styles.label}>
        {LABEL}
      </label>
      {type === "comment" ? ( //comment인경우에 textarea를 반환
        <textarea
          id={type}
          className={styles.commentInput}
          placeholder={MESSAGE}
          onChange={onChange}
          spellCheck="false" // 맞춤법 빨간줄 없애기
          value={inputValue} // 조건부로 value 설정
        />
      ) : (
        <div className={styles.inputContainer}>
          <input //comment가 아닌 경우에는 input태그를 반환
            id={type}
            className={styles.otherInput}
            placeholder={MESSAGE}
            type={INPUTTYPE}
            onChange={onChange}
            autoComplete="off"
            value={inputValue} // 조건부로 value 설정
          />
          {(type === "password" || type === "confirm") && ( //비밀번호계열 인풋은 토글 버튼추가
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={onToggle}
            >
              <img src={toggleImg} alt="토글이미지" />
            </button>
          )}
        </div>
      )}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

export default InvestmentForm;
