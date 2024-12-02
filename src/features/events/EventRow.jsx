import styled from "styled-components";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateEventForm from "./CreateEventForm.jsx";
import { HiUserAdd } from "react-icons/hi";
import { useAddParticipants } from "./useAddParticipants.js";
import Spinner from "../../ui/Spinner.jsx";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1fr 1fr;
  column-gap: 1.6rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 4px;
`;

const EventTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Description = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  font-family: "Roboto";
`;

const Status = styled.div`
  font-family: "Sono";
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ status }) =>
    status === "active"
      ? "var(--color-green-700)"
      : status === "completed"
      ? "var(--color-grey-600)"
      : "var(--color-red-700)"};
`;

const UserListModal = styled.div`
  position: absolute;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  max-height: 60%;
  overflow-y: auto;
  z-index: 100;
`;

const UserItem = styled.div`
  padding: 1rem;
  background: var(--color-grey-100);
  margin-bottom: 0.5rem;
  cursor: pointer;
  &:hover {
    background: var(--color-grey-200);
  }
`;

const AddParticipantsButton = styled.button`
  padding: 0.8rem 1.6rem;
  background: var(--color-blue-500);
  color: var(--color-blue-500);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: var(--color-blue-600);
  }
`;

export default function EventRow({ event, users }) {
  const [showForm, setShowForm] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(() =>
    event.participants.map((par) => par._id)
  );
  const { isAdding, addParticipantsToEvent } = useAddParticipants();
  const {
    _id: id,
    title,
    description,
    startDate,
    endDate,
    location,
    image,
    status,
  } = event;

  // Handle image fallback
  const eventImage = image || "placeholder-image-url.jpg";

  // Toggle user selection
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle adding participants (UI only)
  const handleAddParticipants = () => {
    addParticipantsToEvent({ eventId: id, participants: selectedUsers });
    console.log("step1", { eventId: id, participants: selectedUsers });

    setShowUserList(false);
  };

  return (
    <>
      <TableRow role="row">
        <EventTitle>{title}</EventTitle>
        <Description>{description}</Description>
        <div>{new Date(startDate).toLocaleDateString()}</div>
        <div>{new Date(endDate).toLocaleDateString()}</div>
        <div>{location}</div>
        <Status status={status}>{status || "Unknown"}</Status>
        <Img src={eventImage} alt={title} />
        <div>
          <button onClick={() => setShowForm((prev) => !prev)}>
            <HiPencil />
          </button>
          <button>
            <HiTrash />
          </button>
          <button onClick={() => setShowUserList((s) => !s)}>
            <HiUserAdd />
          </button>
        </div>
      </TableRow>

      {/* Modal for selecting participants */}
      {showUserList &&
        (isAdding ? (
          <Spinner />
        ) : (
          <UserListModal>
            <h3>Select Participants</h3>
            {users.map((user) => (
              <UserItem
                key={user._id}
                onClick={() => handleSelectUser(user._id)}
                style={{
                  backgroundColor: selectedUsers.includes(user._id)
                    ? "var(--color-green-100)"
                    : "var(--color-grey-100)",
                }}
              >
                {user.username} ({user.email})
              </UserItem>
            ))}
            <div>
              <AddParticipantsButton onClick={handleAddParticipants}>
                <HiUserAdd />
                Add Selected
              </AddParticipantsButton>
              <button onClick={() => setShowUserList(false)}>Cancel</button>
            </div>
          </UserListModal>
        ))}

      {showForm && <CreateEventForm eventToEdit={event} />}
    </>
  );
}
