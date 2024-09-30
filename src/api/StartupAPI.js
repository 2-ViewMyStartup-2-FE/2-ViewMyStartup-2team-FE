import { requestGet, requestGetDB } from "./api.js";

export async function getStartupList() {
  try {
    const response = await requestGet("/dummy.json");
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function getCountList(page, limit, order) {
  try {
    const params = { page, limit, order };

    const response = await requestGetDB("api/companies/counts", params);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

getCountList(1, 10, "myCountLowest").then((res) => {
  console.log(res);
  return res;
});
