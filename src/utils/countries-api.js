import axios from "axios";

const countriesApi = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1/",
});

export const getAllCities = async () => {
  try {
    const response = await countriesApi.get("countries");
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
};
