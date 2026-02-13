import api from "./api";

export const loginUser = async (credentials: any) => {
  const { data } = await api.post("/auth/login", credentials);
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

export const registerUser = async (userData: any) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};
