import axios from "axios";

export const API_URL = "http://localhost:3000/";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
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
    const response = await axios.get(API_URL + "events");
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
      response = await axios.post(
        API_URL + "events",
        newEvent,
        getAuthHeaders()
      );
    } else {
      // Update event
      response = await axios.put(
        `${API_URL}/events/${id}`,
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
    const response = await axios.delete(
      `${API_URL}/events/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Event could not be deleted");
  }
}

export async function addParticipants(eventId, participants) {
  console.log("step2", eventId, participants);

  try {
    const response = await axios.put(
      `${API_URL}events/add-participants/${eventId}`,
      { participants },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Participants could not be added to the event");
  }
}
