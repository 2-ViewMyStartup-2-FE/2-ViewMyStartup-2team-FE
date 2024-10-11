import { useState, useEffect } from "react";

export default function useFetchList(
  getFunction,
  currentPage,
  sortType,
  search = "",
  excludeId = null,
  limit = 10,
) {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFunction({
          page: currentPage,
          limit: limit,
          order: sortType,
          search: search,
          excludeId: excludeId,
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
  }, [getFunction, currentPage, sortType, search, excludeId, limit]);

  return { data, totalCount };
}
