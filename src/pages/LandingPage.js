import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../css/LandingPage.module.css";
import logo from "../asset/images/img_logo.png";
import tablet_logo from "../asset/images/tablet_logo.png"; // tablet 전용 로고
import img from "../asset/images/img_landing.png";

export default function LandingPage() {
  const [tablet, setTablet] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handle_resize = () => {
        const width = window.innerWidth;

        // width가 744px 이상 1199px 미만일 때 tablet 크기로 간주
        setTablet(width >= 744 && width < 1199);
  
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

  return (
    <div className={style.container}>
      <div className={`${style.logoGroup} ${style.tablet}`}>
        <img
          className={`${style.logo} ${style.tablet}`}
          src={tablet ? tablet_logo : logo}
          alt="logo_img"
        />
        <div className={style.descGroup}>
            <p className={style.desc_1}>당신을 위한 모의 투자</p>
            <p className={style.desc_2}>스타트업을 비교하고 투자해보세요</p>
        </div>
        <Link to="/companies">
          <button className={style.startBtn}>시작하기</button>
        </Link>
      </div>
      {!tablet && !mobile && <img className={style.img} src={img} alt="landing_img" />}
    </div>
  );
}
