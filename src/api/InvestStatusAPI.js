import { requestGet } from "./api.js";
  
  export async function getInvestmentList(params = {}) {
    try {
      const response = await requestGet('/investments', params);
      return response.data;
    } catch(e) {
      console.error(e.message);
    }
  }

