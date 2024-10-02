import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 10000,
});

export async function requestGet(url, params = {}) {
  try {
    // dummy data 사용으로 임시로 axios 나중에는 instance로 변경
    return await axios.get(url, { params });
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
    return await instance.post(url, data);
  } catch (e) {
    console.error("post error: ", e.message);
  }
}

export async function requestPatch(url, data) {
  try {
    return await instance.patch(url, data);
  } catch (e) {
    console.error("patch error: ", e.message);
  }
}

export async function requestDelete(url) {
  try {
    return await instance.delete(url);
  } catch (e) {
    console.error("delete error: ", e.message);
  }
}
