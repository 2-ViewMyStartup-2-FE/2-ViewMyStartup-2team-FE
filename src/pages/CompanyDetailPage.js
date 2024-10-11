import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getCompanyDetail } from "../api/CompanyDetailAPI.js";
import styles from "../css/CompanyDetailPage.module.css";
import InvestmentInfoList from "../component/InvestmentInfoList.js";
import CompanyDetailTable from "../component/CompanyDetailTable.js";
import CompanyInvestmentAction from "../component/CompanyInvestmentAction.js";

export default function CompanyDetailPage() {
  const [startupData, setStartupData] = useState([]); // 스타트업 데이터 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(false); // 에러 상태 추가
  const { id } = useParams();
  const navigate = useNavigate(); // navigate 사용

  const fetchData = useCallback(async () => {
    try {
      console.log(id);
      console.log("getCompanyDetail 호출 전");
      const response = await getCompanyDetail(id); // API 호출
      console.log("getCompanyDetail 호출 후");
      console.log("API 호출 결과:", response);
      if (!response) {
        setError(true); // 에러 상태로 전환
        navigate("/404"); // 404로 리디렉션
      } else {
        setStartupData(response); // 데이터 저장
        setLoading(false); // 로딩 완료
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
      navigate("/404"); // 에러 시 404 리디렉션
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.companyDetailPage}>
      <CompanyDetailTable startupListData={startupData} />
      <CompanyInvestmentAction
        startupListData={startupData}
        fetchData={fetchData}
      />
      <InvestmentInfoList data={startupData} fetchData={fetchData} />
    </div>
  );
}
