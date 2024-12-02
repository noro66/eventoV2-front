import axios from "axios";
import { getAuthHeaders, API_URL } from "./apiEvents"; // Import the base API_URL and auth headers function

// Get all users
export async function getUsers(keyword = "") {
  try {
    const response = await axios.get(API_URL + "users", {
      params: { keyword },
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }
}

// Create or update a user
export async function createEditUser(newUser, id) {
  try {
    let response;

    if (!id) {
      // Create user
      response = await axios.post(
        API_URL + "users/auth/register",
        newUser,
        getAuthHeaders()
      );
    } else {
      // Update user
      response = await axios.put(
        `${API_URL}/users/${id}`,
        newUser,
        getAuthHeaders()
      );
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("User could not be created/updated");
  }
}

// Delete a user
export async function deleteUser(id) {
  try {
    const response = await axios.delete(
      `${API_URL}/users/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
}
