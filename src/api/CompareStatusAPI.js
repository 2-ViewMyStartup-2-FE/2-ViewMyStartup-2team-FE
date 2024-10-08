import { requestGet } from "./api.js";

//CompareStatus - count list 가져오는 함수
export async function getCountList(page, limit, order) {
  try {
    // page 유효성 검사
    if (typeof page !== "number" || page < 0) {
      throw new Error("Page must be a positive number");
    }
    // limit 유효성 검사
    if (typeof limit !== "number" || limit < 0) {
      throw new Error("Limit must be a positive number");
    }
    // order 유효성 검사
    if (typeof order !== "string") {
      throw new Error("Order must be a string");
    }
    const params = { page, limit, order };
    const response = await requestGet("/companies/counts", params);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}
