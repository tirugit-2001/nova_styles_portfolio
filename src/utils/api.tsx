import type { AxiosResponse } from "axios";
import axios from "./axios";

export const requestHandler = async (
    api: () => Promise<AxiosResponse<any, any>>,
    onSuccess: (data: any) => void,
    onError: (error: string) => void
  ) => {
    try {
      const response = await api();
  
      if (response && response.data) {
        const { data } = response;
  
        if (data.success) {
          onSuccess(data);
        } else {
          console.log("API returned success: false");
          onError(data.message || "Something went wrong");
        }
      }
    } catch (error: any) {
      console.error("Request error:", error);
  
      if (error.response?.data?.message) {
        onError(error.response.data.message);
      } else {
        onError(error.message || "Something went wrong");
      }
    }
  };



export const getInteriorPortfolio = async () => {
  const response = await axios.get(`/portfolioContent/portfolio`);
  return response
}