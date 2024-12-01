import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreateEvent } from "./useCreateEvent";
import { useEditEvent } from "./useEditEvent";

function CreateEventForm({ eventToEdit = {} }) {
  const { _id: editId, ...editValues } = eventToEdit;
  const isEditSession = Boolean(editId);
  const { startDate, endDate } = eventToEdit;

  const formattedStartDate = startDate
    ? new Date(startDate).toISOString().split("T")[0]
    : "";
  const formattedEndDate = endDate
    ? new Date(endDate).toISOString().split("T")[0]
    : "";

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession
      ? {
          ...editValues,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }
      : {},
  });

  const { isCreating, createEvent } = useCreateEvent(reset);
  const { isEditing, editEvent } = useEditEvent();

  const isWorking = isCreating || isEditing;
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editEvent(
        { newEventData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    } else {
      createEvent(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Event Title" error={errors?.title?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="title"
          {...register("title", {
            required: "This field is required!",
            minLength: {
              value: 2,
              message: "Title must be at least 2 characters long!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Event Description" error={errors?.description?.message}>
        <Textarea
          disabled={isWorking}
          id="description"
          {...register("description", {
            required: "This field is required!",
            minLength: {
              value: 5,
              message: "Description must be at least 5 characters long!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          disabled={isWorking}
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          disabled={isWorking}
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="Location" error={errors?.location?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="location"
          {...register("location", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="Event Status" error={errors?.status?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="status"
          {...register("status", {
            validate: (value) =>
              ["active", "completed", "canceled"].includes(value) ||
              "Status must be 'active', 'completed', or 'canceled'!",
          })}
          placeholder="active/completed/canceled"
        />
      </FormRow>

      <FormRow label="Event Image" error={errors?.image?.message}>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => reset()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Event" : "Create Event"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEventForm;
