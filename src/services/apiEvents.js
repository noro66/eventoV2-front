import axios from "axios";

const API_URL = "http://localhost:3000/events";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  console.log(token);
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export async function getEvents(keyword = "") {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Events could not be loaded");
  }
}

export async function createEditEvent(newEvent, id) {
  try {
    let response;

    if (!id) {
      // Create event
      response = await axios.post(API_URL, newEvent, getAuthHeaders());
    } else {
      // Update event
      response = await axios.put(
        `${API_URL}/${id}`,
        newEvent,
        getAuthHeaders()
      );
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Event could not be created/updated");
  }
}

export async function deleteEvent(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Event could not be deleted");
  }
}

export async function addParticipants(eventId, participants) {
  try {
    const response = await axios.put(
      `${API_URL}/add-participants/${eventId}`,
      { participants },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Participants could not be added to the event");
  }
}
