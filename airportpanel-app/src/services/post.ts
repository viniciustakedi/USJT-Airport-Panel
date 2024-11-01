import axios from "axios";
import { FlightDataType, LoginDataType, UserDataType } from "./models/post";
import { getToken } from "@/configs";

export const newUser = async (data: UserDataType) => {
  try {

    data.roles = ["writer"];

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      data,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newFlight = async (data: FlightDataType) => {
  try {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/flights`,
      data,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: LoginDataType) => {
  try {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      data,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
