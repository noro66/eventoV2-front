import axios from "axios";

export async function login({ email, password }) {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/auth/login",
      {
        email,
        password,
      }
    );

    if (response.message) throw new Error("invalid Credintials");

    console.log(response.ok);
    if (response.data.accessToken) {
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
