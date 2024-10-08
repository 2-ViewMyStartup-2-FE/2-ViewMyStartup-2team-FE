import {
  requestGetDB,
  requestPost,
  requestPatch,
  requestDelete,
} from "./api.js";

export async function getCompanyDetail(id) {
  try {
    const response = await requestGetDB(`/companies/${id}/investments`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export async function postInvestment(id, data) {
  // 유효성 검사
  const { investorName, amount, comment, password } = data;

  if (investorName.length < 2 || investorName.length > 10) {
    throw new Error("투자자 이름은 2자 이상, 10자 이하여야 합니다.");
  }

  // 1억 이상, 1조 미만
  if (amount < 100000000 || amount >= 1000000000000) {
    throw new Error("투자 금액은 1억 이상, 1조 미만이어야 합니다.");
  }

  if (comment.length < 10 || comment.length > 30) {
    throw new Error("투자 코멘트는 10자 이상, 30자 이하여야 합니다.");
  }

  if (password.length < 8 || password.length > 15) {
    throw new Error("비밀번호는 8자 이상, 15자 이하여야 합니다.");
  }

  try {
    const response = await requestPost(`/companies2/${id}/investments`, data);
    return response.data;
  } catch (e) {
    throw new Error(`투자 정보 생성 실패: ${e.message}`);
  }
}

export async function patchInvestment(id, data) {
  // 유효성 검사
  const { investorName, amount, comment, password } = data;

  if (investorName.length < 2 || investorName.length > 10) {
    throw new Error("투자자 이름은 2자 이상, 10자 이하여야 합니다.");
  }

  // 1억 이상, 1조 미만
  if (amount < 100000000 || amount >= 1000000000000) {
    throw new Error("투자 금액은 1억 이상, 1조 미만이어야 합니다.");
  }

  if (comment.length < 10 || comment.length > 30) {
    throw new Error("투자 코멘트는 10자 이상, 30자 이하여야 합니다.");
  }

  if (password.length < 8 || password.length > 15) {
    throw new Error("비밀번호는 8자 이상, 15자 이하여야 합니다.");
  }

  // 유효성 검사를 통과한 경우에만 PATCH 요청을 보냄
  try {
    const response = await requestPatch(`/investments/${id}`, data);
    return response.data;
  } catch (e) {
    throw new Error(`투자 정보 업데이트 실패: ${e.message}`);
  }
}

export async function deleteInvestment(id) {
  try {
    const response = await requestDelete(`/investments/${id}`);

    // 요청이 204 (No Content) 이거나 200일 때 성공으로 간주
    if (response.status === 200 || response.status === 204) {
      return true; // 성공 시 true 반환
    } else {
      console.error(`Failed to delete investment. Status: ${response.status}`);
      return false; // 실패 시 false 반환
    }
  } catch (e) {
    console.error(e.message);
    return false; // 예외 발생 시 false 반환
  }
}
