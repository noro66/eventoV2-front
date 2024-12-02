import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useCreateUser } from "./useCreateUser";
import { useEditUser } from "./useEditUser";

function CreateUserForm({ userToEdit = {} }) {
  const { _id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? { ...editValues } : {},
  });

  const { isCreating, createUser } = useCreateUser(reset);
  const { isEditing, editUser } = useEditUser();

  const isWorking = isCreating || isEditing;
  const { errors } = formState;

  function onSubmit(data) {
    const { password, username, ...other } = data;
    if (isEditSession) {
      editUser(
        { newUserData: { username, password }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    } else {
      createUser(data, {
        onSuccess: () => reset(),
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Username" error={errors?.username?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="username"
          {...register("username", {
            required: "This field is required!",
            maxLength: {
              value: 150,
              message: "Username cannot exceed 150 characters!",
            },
          })}
        />
      </FormRow>

      {!isEditSession ? (
        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            disabled={isWorking}
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address!",
              },
              maxLength: {
                value: 250,
                message: "Email cannot exceed 250 characters!",
              },
            })}
          />
        </FormRow>
      ) : null}

      <FormRow label="Password" error={errors?.password?.message}>
        <Input
          disabled={isWorking}
          type="password"
          id="password"
          {...register("password", {
            required: isEditSession ? false : "This field is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long!",
            },
          })}
        />
      </FormRow>

      {!isEditSession ? (
        <FormRow
          label="Account Verified"
          error={errors?.isAccountVerified?.message}
        >
          <Input
            disabled={isWorking}
            type="checkbox"
            id="isAccountVerified"
            {...register("isAccountVerified")}
          />
        </FormRow>
      ) : null}

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => reset()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit User" : "Create User"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
