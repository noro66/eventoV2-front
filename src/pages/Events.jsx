import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button.jsx";
import { useState } from "react";
import EventTable from "../features/events/EventTable.jsx";
import CreateEventForm from "../features/events/CreateEventForm.jsx";
import { useUser } from "../features/authentication/useUser.js";
import Spinner from "../ui/Spinner.jsx";
import { useEvents } from "../features/events/useEvents.js";
import { HiCalendar, HiMap } from "react-icons/hi2";

// Styled components
const Card = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 28rem;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
`;

const Badge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-900);
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  color: var(--color-grey-600);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Info = styled.div`
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  svg {
    margin-right: 0.75rem;
  }

  span {
    color: var(--color-grey-700);
  }
`;

const Username = styled.span`
  color: var(--color-blue-700);
  font-weight: bold;
`;

// Main component
function Events() {
  const [showForm, setShowForm] = useState(false);
  const { isPending: isUserPending, user } = useUser();
  const { isPending: isEventPending, Events } = useEvents();

  const myEvents =
    Events?.filter((event) =>
      event.participants.some((par) => par._id === user._id)
    ) || [];

  if (isUserPending || isEventPending) return <Spinner />;

  console.log(user._id, myEvents, Events);

  if (!user || !Events)
    return <p>Error loading data. Please try again later.</p>;

  return user.userType === "admin" ? (
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
  ) : (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Events</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row type="horisontal" style={{ flexWrap: "wrap", gap: "1.6rem" }}>
        {myEvents.length === 0 ? (
          <p>
            Hello MR <Username>{user.username}</Username>, No events found. You
            will be involved in one soon 😊.
          </p>
        ) : (
          myEvents.map(
            ({ _id, status, title, description, startDate, location }) => (
              <Card key={_id}>
                <ImageWrapper>
                  <Image
                    src="https://www.coe.int/documents/24916852/0/Supporters3.jpg/63b405d6-be6d-d2ec-bd11-0f03c6ca8130?t=1503560660000"
                    alt={title}
                  />
                  <Badge>{status}</Badge>
                </ImageWrapper>
                <Content>
                  <Title>{title}</Title>
                  <Description>{description}</Description>
                  <Info>
                    <InfoItem>
                      <HiCalendar />
                      <span>{new Date(startDate).toLocaleDateString()}</span>
                    </InfoItem>
                    <InfoItem>
                      <HiMap size={20} color="var(--color-red-700)" />
                      <span>{location}</span>
                    </InfoItem>
                  </Info>
                </Content>
              </Card>
            )
          )
        )}
      </Row>
    </>
  );
}

export default Events;
