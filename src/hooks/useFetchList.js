import { useState, useEffect } from "react";

export default function useFetchList(getFunction, currentPage, sortType, search = "") {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFunction({
          page: currentPage,
          limit: 10,
          order: sortType,
          search: search
        });

        if (response) {
          setData(response.data);
          setTotalCount(response.totalCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getFunction, currentPage, sortType, search]);

  return { data, totalCount };
}
