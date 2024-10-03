import { requestGet } from "./api.js";

export async function getStartupList(params = {}) {
  try {
    const response = await requestGet("/companies", params);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function getStartup(id) {
  try {
    const response = await requestGet(`/companies/${id}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}
