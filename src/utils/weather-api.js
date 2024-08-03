import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export const getWeatherData = async (city) => {
  try {
    const params = {
      q: city,
      appid: "552477be6585fd2f97c74b5abd4c4b1a",
      units: "metric",
    };
    const response = await api.get("weather", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
