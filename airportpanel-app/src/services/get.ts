import { getToken } from "@/configs";
import { Airport } from "@/contexts/airports";
import { Company } from "@/contexts/companies";
import axios from "axios";
import { FlightDataGetType } from "./models/post";

export const get = async (url: string, params?: any) => {};

export const getAirports = async (airports?: Airport[]) => {
  try {
    if (airports && airports.length > 0) return airports;

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/airports`,
      axiosConfig
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanies = async (companies?: Company[]) => {
  try {
    if (companies && companies.length > 0) return companies;

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/companies`,
      axiosConfig
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getFlights = async (flights?: FlightDataGetType[]) => {
  try {
    if (flights && flights.length > 0) return flights;

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/flights`,
      axiosConfig
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
}
