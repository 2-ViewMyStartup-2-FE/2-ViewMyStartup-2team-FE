import { requestGetDB } from "./api.js";
export async function getRankAndNearbyCompanies({
  myCompanyId,
  order = "investmentHighest"
}) {
  try {
    console.log(order);
    const response = await requestGetDB(
      `/companies/${myCompanyId}/rank?order=${order}`
    );
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
}
