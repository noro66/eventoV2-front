import { useState } from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import UserTable from "../features/users/UserTable";
import Button from "../ui/Button";
import CreateUserForm from "../features/users/CreateUserForm";

function Users() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <UserTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add New User
        </Button>
        {showForm && <CreateUserForm />}
      </Row>
    </>
  );
}

export default Users;
