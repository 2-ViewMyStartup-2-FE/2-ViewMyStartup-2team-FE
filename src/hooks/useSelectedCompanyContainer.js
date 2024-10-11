import { useState } from 'react';

const ITEM_LIMIT = 5; // 최대 선택 기업 수

const useSelectedCompaniesContainer = () => {
  const [addSelectedCompany, setAddSelectedCompany] = useState([]); // 선택된 추가 기업들

  const addCompany = (company) => {
    if (addSelectedCompany.length < ITEM_LIMIT) {
      setAddSelectedCompany((prev) => [...prev, company]);
    }
  };

  const removeCompany = (id) => {
    setAddSelectedCompany((prev) => prev.filter((company) => company.id !== id));
  };

  const resetCompanies = () => {
    setAddSelectedCompany([]);
  };

  return {
    addSelectedCompany,
    addCompany,
    removeCompany,
    resetCompanies,
  };
};

export default useSelectedCompaniesContainer;