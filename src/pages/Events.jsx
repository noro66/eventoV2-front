import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button.jsx";
import { useState } from "react";
import EventTable from "../features/events/EventTable.jsx";
import CreateEventForm from "../features/events/CreateEventForm.jsx";

function Events() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Events</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <EventTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add New Event
        </Button>
        {showForm && <CreateEventForm />}
      </Row>
    </>
  );
}

export default Events;
