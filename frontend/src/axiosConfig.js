import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080"
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // 👇 Для публичных ручек не подставляем токен
  const isPublicGet =
  (config.method === "get" && (
    config.url.startsWith("/api/trainers") ||
    config.url.startsWith("/api/martial-arts")
  ));

if (token && !isPublicGet) {
  config.headers["Authorization"] = "Bearer " + token;
}

  return config;
});

export default instance;