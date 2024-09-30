import axios from "axios";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 10000,
});

export async function requestGet( params = {}) {
  try {
    return await instance.get("/companies/counts", { params });// (/counts path 변경할 예정.)
  } catch (e) {
    console.error('get error: ', e.message);
  }
}

export async function requestPost(url, data) {
  try {
    return await instance.post(url, data);
  } catch (e) {
    console.error('post error: ', e.message);
  }
}

export async function requestPatch(url, data) {
  try {
    return await instance.patch(url, data);
  } catch (e) {
    console.error('patch error: ', e.message);
  }
}

export async function requestDelete(url) {
  try {
    return await instance.delete(url);
  } catch (e) {
    console.error('delete error: ', e.message);
  }
}
