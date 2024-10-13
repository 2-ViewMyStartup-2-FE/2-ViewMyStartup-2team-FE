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
  const [isNotFound, setIsNotFound] = useState(false);

  const dataFetchedRef = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (dataFetchedRef.current) return;
      try {
        if (!myCompanyId || selectedCompaniesId.length === 0) return;
        const myCompanyData = await getStartup(myCompanyId);
        //id가 없는 경우 바로 오류 상태를 전송하는 로직 추가
        if (!myCompanyData) {
          setIsNotFound(true);
          return;
        }
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
      } catch (e) {
        console.log("데이터 가져오는중 에러발생");
      }
    };

    fetchData();
    dataFetchedRef.current = true;
  }, [myCompanyId, selectedCompaniesId]);

  return { compStatus, setCompStatus, rankStatus, setRankStatus, isNotFound };
};

export default useFetchCompanyData;
