import { requestGet } from "./api.js";

export async function getStartupList() {
  try {
    const response = await requestGet("/dummy.json");
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}
