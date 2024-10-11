import errorImage from "../asset/images/404.svg";
import style from "../css/PageNotfoundPage.module.css";
import { Link } from "react-router-dom";

export default function PageNotfoundPage() {
  return (
    <div className={style.pageNotfoundPage}>
      <div className={style.errorimage}>
        <img src={errorImage} alt="404 error - page not found" />
      </div>
      <div className={style.container}>
        <h1 className={style.header}>페이지를 찾을 수 없음</h1>
        <div className={style.subContainer}>
          <p className={style.subscript}>
            죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
          </p>
          <p className={style.subscript}>페이지의 주소가 잘못 입력되었거나,</p>
          <p className={style.subscript}>
            요청하신 페이지의 주소가 변경, 삭제 되어 찾을 수 없습니다.
          </p>
        </div>
        <Link
          className={style.homeBtn}
          to="/"
          aria-label="Go back to the homepage"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
