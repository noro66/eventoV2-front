import axios from "axios";
import { API_URL, getAuthHeaders } from "./apiEvents";

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${API_URL}users/auth/login`, {
      email,
      password,
    });

    if (response.message) throw new Error("invalid Credintials");

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return {
        success: true,
        token: response.data.token,
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  console.log("hahah get user");

  try {
    const response = await axios.get(
      `${API_URL}users/auth/current-user`,
      getAuthHeaders()
    );
    

    if (response.data && response.data.message) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
