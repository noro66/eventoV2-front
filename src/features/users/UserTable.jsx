import styled from "styled-components";
import Spinner from "../../ui/Spinner.jsx";
import UserRow from "./UserRow.jsx";
import { useUsers } from "./useUsers.js";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1.5fr 1fr;
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

export default function UserTable() {
  const { isPending, users, error } = useUsers();

  if (isPending) return <Spinner />;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <Table role="table">
      <TableHeader>
        <div>Username</div>
        <div>Email</div>
        <div>Registered</div>
        <div>Status</div>
        <div>Actions</div>
      </TableHeader>
      {users?.map((user) => (
        <UserRow user={user} key={user._id} />
      ))}
    </Table>
  );
}
