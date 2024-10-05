import {
  requestGetDB,
  requestPost,
  requestPatch,
  requestDelete,
} from "./api.js";

export async function getCompanyDetail(id) {
  try {
    const response = await requestGetDB(`/companies2/${id}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function postInvestment(id, data) {
  try {
    const response = await requestPost(`/companies2/${id}/investments`, data);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function patchInvestment(id, data) {
  try {
    const response = await requestPatch(`/investments/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function deleteInvestment(id) {
  try {
    const response = await requestDelete(`/investments/${id}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}
