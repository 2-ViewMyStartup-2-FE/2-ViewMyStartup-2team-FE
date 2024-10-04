import { requestGetDB, requestPost } from "./api.js";
export async function getRankAndNearbyCompanies({
  myCompanyId,
  order = "investmentHighest"
}) {
  try {
    const response = await requestGetDB(
      `/companies/${myCompanyId}/rank?order=${order}`
    );
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}
export async function postInvestment(companyId, formData) {
  try {
    if (typeof formData !== "object") {
      throw new Error("formData should be an object");
    }
    const response = await requestPost(
      `/companies/${companyId}/investments`,
      formData
    );
    if (response) {
      console.log(response.data);
    } else {
      console.log("데이터 전송 실패");
    }
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}
