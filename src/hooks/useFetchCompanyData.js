import { useState, useEffect, useRef } from "react";
import { getRankAndNearbyCompanies } from "../api/CompareResultAPI.js";
import { getStartup } from "../api/StartupAPI.js";
import sortData from "../utils/sortData.js";

const useFetchCompanyData = (myCompanyId, selectedCompaniesId) => {
  const [compStatus, setCompStatus] = useState({
    sort: "누적 투자금액 높은순",
    list: []
  });
  const [rankStatus, setRankStatus] = useState({
    sort: "누적 투자금액 높은순",
    list: []
  });
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (dataFetchedRef.current) return;
      if (!myCompanyId || selectedCompaniesId.length === 0) return;
      const myCompanyData = await getStartup(myCompanyId);
      const selectedCompanies = await Promise.all(
        selectedCompaniesId.map((id) => getStartup(id))
      );

      const compList = sortData(
        [myCompanyData, ...selectedCompanies],
        "누적 투자금액 높은순"
      );
      setCompStatus((prev) => ({
        ...prev,
        list: compList
      }));

      const rankList = await getRankAndNearbyCompanies({ myCompanyId });
      setRankStatus((prev) => ({
        ...prev,
        list: rankList
      }));
    };

    fetchData();
    dataFetchedRef.current = true;
  }, [myCompanyId, selectedCompaniesId]);

  return { compStatus, setCompStatus, rankStatus, setRankStatus };
};

export default useFetchCompanyData;
