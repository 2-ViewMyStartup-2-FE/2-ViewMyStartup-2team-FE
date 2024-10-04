import { requestGetDB } from "./api.js";
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
