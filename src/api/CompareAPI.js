import { requestGet } from "./api.js";
  
  export async function getCompareList(params = {}) {
    try {
      const response = await requestGet('/comparison', params);
      return response.data;
    } catch(e) {
      console.error(e.message);
    }
  }
  export async function getCompare(id) {
    try {
      const response = await requestGet(`/comaprison/${id}`);
      return response.data;
    } catch(e) {
      console.error(e.message);
    }
  }
  // export async function patchCompare(id) {

  // }