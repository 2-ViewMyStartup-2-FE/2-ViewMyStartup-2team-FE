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
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}
