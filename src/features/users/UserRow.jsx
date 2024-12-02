import styled from "styled-components";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateUserForm from "./CreateUserForm";
import { useDeleteUser } from "./useDeleteUser";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1.5fr 1fr;
  column-gap: 1.6rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const UserName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Email = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  font-family: "Roboto";
`;

const Status = styled.div`
  font-family: "Sono";
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ isVerified }) =>
    isVerified ? "var(--color-green-700)" : "var(--color-red-700)"};
`;

export default function UserRow({ user }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteUser } = useDeleteUser();

  const { _id: id, username, email, isAccountVerified, createdAt } = user;

  return (
    <>
      <TableRow role="row">
        <UserName>{username || "N/A"}</UserName>
        <Email>{email}</Email>
        <div>{new Date(createdAt).toLocaleDateString()}</div>
        <Status isVerified={isAccountVerified}>
          {isAccountVerified ? "Verified" : "Not Verified"}
        </Status>
        <div>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            disabled={isDeleting}
          >
            <HiPencil />
          </button>
          <button onClick={() => deleteUser(id)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateUserForm userToEdit={user} />}
    </>
  );
}
