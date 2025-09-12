import axios from "axios";

const instance = axios.create({
  baseURL: "http://52.78.232.199:8084",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 전: 토큰 붙이기
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 후: 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
