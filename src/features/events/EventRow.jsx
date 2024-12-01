import styled from "styled-components";
import { useState } from "react";
import { useDeleteEvent } from "./useDeleteEvent.js";
import CreateEventForm from "./CreateEventForm.jsx";
import { HiPencil, HiTrash } from "react-icons/hi2";

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

export default function EventRow({ event }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteEvent } = useDeleteEvent();

  const {
    id,
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
          <button
            onClick={() => setShowForm((prev) => !prev)}
            disabled={isDeleting} // Disable form toggle while deleting
          >
            <HiPencil />
          </button>
          <button onClick={() => deleteEvent(id)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateEventForm eventToEdit={event} />}
    </>
  );
}
