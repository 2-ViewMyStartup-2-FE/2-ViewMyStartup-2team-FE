import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getCompanyDetail } from "../api/CompanyDetailAPI.js";
import styles from "../css/CompanyDetailPage.module.css";
import InvestmentInfoList from "../component/InvestmentInfoList.js";
import CompanyDetailTable from "../component/CompanyDetailTable.js";
import CompanyInvestmentAction from "../component/CompanyInvestmentAction.js";
import NotFoundPage from "./NotPage.js";

export default function CompanyDetailPage() {
  const [startupData, setStartupData] = useState([]);
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await getCompanyDetail(id);
      setStartupData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // startupData가 없으면 바로 NotFoundPage를 리턴하는 로직으로 수정
  if (!startupData) {
    return <NotFoundPage />;
  }

  // startupData가 존재할 때만 렌더링
  return (
    <div className={styles.companyDetailPage}>
      {startupData && (
        <>
          <CompanyDetailTable startupListData={startupData} />
          <CompanyInvestmentAction
            startupListData={startupData}
            fetchData={fetchData}
          />
          <InvestmentInfoList data={startupData} fetchData={fetchData} />
        </>
      )}
    </div>
  );
}
