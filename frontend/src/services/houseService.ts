import api from "./api";

export const getHouses = async () => {
  const { data } = await api.get("/houses");
  return data;
};

export const createHouse = async (houseData: any) => {
  const { data } = await api.post("/houses", houseData);
  return data;
};

export const deleteHouse = async (id: number) => {
  await api.delete(`/houses/${id}`);
};
