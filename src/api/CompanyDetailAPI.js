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
    if (data.comment.length < 10) {
      throw new Error("Page must be a positive number");
    }
    const response = await requestPatch(`/investments/${id}`, data);
    console.log("서버 응답:", response); // 전체 응답을 출력
    return response.data; // 여기가 문제가 발생한 부분
  } catch (e) {
    console.error("패치 요청 실패:", e.message);
  }
}

export async function patchInvestment(id, data) {
  try {
    console.log(data.comment.length);
    if (data.comment.length < 10 && data.comment.length > 30) {
      throw new Error("Page must be a positive number");
    }
    const response = await requestPatch(`/investments/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

// async function patchInvestment(companyid, investorid, data) {
//   try {
//     console.log("패치 요청 보냄:", data);
//     const response = await requestPatch(
//       `companies2/${companyid}/investments/${investorid}`,
//       data
//     );
//     console.log("서버 응답 전체:", response); // 전체 응답을 출력
//     return response.data; // 여기가 문제가 발생한 부분
//   } catch (e) {
//     console.error("에러 발생:", e.response?.data || e.message);
//   }
// }

export async function deleteInvestment(id) {
  try {
    const response = await requestDelete(`/investments/${id}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

patchInvestment("b0c1d2e3-f4a5-6b7c-8d9e-0f1g2h3i4j5k", {
  investorName: "수정 되나요",
  amount: 900000000,
  comment: "수정1111111111",
  password: "codeit12345",
});
