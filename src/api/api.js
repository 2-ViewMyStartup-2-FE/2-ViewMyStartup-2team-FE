import axios from "axios";

const instance = axios.create({
  baseURL: "https://two-viewmystartup-2team-be.onrender.com/",
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
