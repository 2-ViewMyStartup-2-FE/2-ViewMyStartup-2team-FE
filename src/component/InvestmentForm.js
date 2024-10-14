import styles from "../css/InvestmentForm.module.css";
import toggle from "../asset/images/toggle.png";
import toggleOff from "../asset/images/closed-eyes.png";
import { useRef, useEffect } from "react";

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
  value = ""
}) {
  const inputRef = useRef(null);
  const {
    frame: FRAME,
    label: LABEL,
    inputType: INPUTTYPE,
    message: MESSAGE
  } = getFieldConfig(type, isVisible, className);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
    }
  }, [value]);
  const toggleImg = isVisible ? toggleOff : toggle;
  // 조건에 따라 다른 JSX를 반환
  if (type === "comment") {
    return (
      <div className={FRAME}>
        <label htmlFor={type} className={styles.label}>
          {LABEL}
        </label>
        <textarea
          id={type}
          className={styles.commentInput}
          placeholder={MESSAGE}
          onChange={onChange}
          spellCheck="false"
          value={value}
        />
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  } else if (type === "amount") {
    return (
      <div className={FRAME}>
        <label htmlFor={type} className={styles.label}>
          {LABEL}
        </label>
        <div className={styles.inputContainer}>
          <div className={styles.otherInput}>
            <input
              id={type}
              ref={inputRef}
              className={styles.amountInput}
              type={INPUTTYPE}
              onChange={onChange}
              autoComplete="off"
              value={value}
              placeholder={MESSAGE}
              style={{ width: value ? "" : "100%" }}
            />
            {value && <div className={styles.amountFormat}>억</div>}
          </div>
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  }
  // 나머지 경우에 대한 반환
  return (
    <div className={FRAME}>
      <label htmlFor={type} className={styles.label}>
        {LABEL}
      </label>
      <div className={styles.inputContainer}>
        <input
          id={type}
          className={styles.otherInput}
          placeholder={MESSAGE}
          type={INPUTTYPE}
          onChange={onChange}
          autoComplete="off"
          value={value} // 조건부로 value 설정
        />
        {(type === "password" || type === "confirm") && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={onToggle}
          >
            <img src={toggleImg} alt="토글이미지" />
          </button>
        )}
      </div>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}
export default InvestmentForm;
