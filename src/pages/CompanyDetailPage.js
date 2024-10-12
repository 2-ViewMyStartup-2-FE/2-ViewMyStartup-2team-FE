import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getCompanyDetail } from "../api/CompanyDetailAPI.js";
import styles from "../css/CompanyDetailPage.module.css";
import InvestmentInfoList from "../component/InvestmentInfoList.js";
import CompanyDetailTable from "../component/CompanyDetailTable.js";
import CompanyInvestmentAction from "../component/CompanyInvestmentAction.js";

export default function CompanyDetailPage() {
  const [startupData, setStartupData] = useState([]); // 스타트업 데이터 상태 관리
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await getCompanyDetail(id);
      if (!response) {
        navigate("/404"); // 404로 리디렉션
      } else {
        setStartupData(response); // 데이터 저장
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
