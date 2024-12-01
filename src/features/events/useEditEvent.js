import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditEvent } from "../../services/apiEvents";
import toast from "react-hot-toast";

export function useEditEvent() {
  const queryclient = useQueryClient();

  const { mutate: editEvent, isPending: isEditing } = useMutation({
    mutationFn: ({ newEventData, id }) => createEditEvent(newEventData, id),
    onSuccess: () => {
      toast.success("New Event succussfully Edied !");
      queryclient.invalidateQueries({
        queryKey: ["Events"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editEvent };
}
