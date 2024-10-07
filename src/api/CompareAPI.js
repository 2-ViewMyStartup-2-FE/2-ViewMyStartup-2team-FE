import { requestGet } from "./api.js";
  

//비교 페이지 API
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
      const response = await requestGet(`/comparison/${id}`);
      return response.data;
    } catch(e) {
      console.error(e.message);
    }
  }

//  export async function patchCompare(id) {
   
//     }
