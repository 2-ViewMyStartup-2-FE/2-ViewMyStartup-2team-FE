import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../css/LandingPage.module.css";
import logo from "../asset/images/img_logo.png";
import pcImg from "../asset/images/p_main_image.svg";
import mobileImg from "../asset/images/m_main_image.svg";

export default function LandingPage() {
  const [tablet, setTablet] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handle_resize = () => {
      const width = window.innerWidth;

      // width가 744px 이상 1199px 미만일 때 tablet 크기로 간주
      setTablet(width >= 744 && width <= 1199);

      // width가 744px 미만일 때 모바일 크기로 간주
      setMobile(width < 744);
    };

    // 컴포넌트가 마운트될 때와 창 크기 변경 시 실행
    window.addEventListener("resize", handle_resize);
    handle_resize(); // 초기 화면 크기를 설정하기 위해 한 번 실행

    return () => {
      window.removeEventListener("resize", handle_resize);
    };
  }, []);

  const displayImg = mobile || tablet ? mobileImg : pcImg;

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.logoGroup}>
          <img className={style.logo} src={logo} alt="logo_img" />
          <p className={style.desc1}>당신을 위한 모의 투자</p>
          <div className={style.descGroup}>
            <p className={style.desc2}>
              언제 어디서나 투자 전략을 테스트할 수 있는
            </p>
            <p className={style.desc2}>내 손안의 스타트업 투자 플랫폼</p>
          </div>
          <Link to="/companies">
            <button className={style.startBtn}>투자 시작하기</button>
          </Link>
        </div>
        <img className={style.img} src={displayImg} alt="landing_img" />
      </div>
    </div>
  );
}
