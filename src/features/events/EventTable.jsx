import styled from "styled-components";
import Spinner from "../../ui/Spinner.jsx";
import EventRow from "./EventRow.jsx";
import { useEvents } from "./useEvents.js";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 1.5fr 1.5fr 1.2fr 1.5fr 1fr 1fr;
  column-gap: 1.6rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function EventTable() {
  const { isPending, Events, Users, error } = useEvents();

  if (isPending) return <Spinner />;
  if (error) return <div>Error loading events: {error.message}</div>;
  return (
    <Table role="table">
      <TableHeader>
        <div>Title</div>
        <div>Description</div>
        <div>Start Date</div>
        <div>End Date</div>
        <div>Location</div>
        <div>Status</div>
        <div>Photo</div>
        <div></div>
      </TableHeader>
      {Events?.map((event) => (
        <EventRow event={event} users={Users} key={event._id} />
      ))}
    </Table>
  );
}
