import axios from "axios";

const instance = axios.create({
  baseURL: "https://two-viewmystartup-2team-be.onrender.com/api",
  // timeout: 10000,
});

export async function requestGet(url, params = {}) {
  try {
    return await instance.get(url, { params });
  } catch (e) {
    console.error("get error: ", e.message);
  }
}

//배포된 서버에서 Get으로 데이터 가져오기
export async function requestGetDB(url, params = {}) {
  try {
    // URL 유효성 검사 (문자열이 맞는지 확인, 공백만 있는 문자열이 아닌지 확인)
    if (typeof url !== "string" || !url.trim()) {
      throw new Error("Invalid URL provided");
    }
    // Params 유효성 검사 (객체인지 확인)
    if (typeof params !== "object") {
      throw new Error("Params should be an object");
    }
    return await instance.get(url, { params });
  } catch (e) {
    console.error("get error: ", e.message);
  }
}

export async function requestPost(url, data) {
  try {
    if (typeof url !== "string" || !url.trim()) {
      throw new Error("Invalid URL provided");
    }
    return await instance.post(url, data);
  } catch (e) {
    console.error("post error: ", e.message);
  }
}

export async function requestPatch(url, data) {
  try {
    console.log("리퀘스트패치 데이터:", data);
    return await instance.patch(url, data);
  } catch (e) {
    console.error("patch error: ", e.message);
    throw e; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
}

export async function requestDelete(url) {
  try {
    return await instance.delete(url);
  } catch (e) {
    console.error("delete error: ", e.message);
  }
}
