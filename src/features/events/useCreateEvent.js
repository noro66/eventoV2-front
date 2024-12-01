import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditEvent } from "../../services/apiEvents";
import toast from "react-hot-toast";

export function useCreateEvent() {
  const queryclient = useQueryClient();
  const { mutate: createEvent, isPending: isCreating } = useMutation({
    mutationFn: createEditEvent,
    onSuccess: () => {
      toast.success("New Event succussfully created !");
      queryclient.invalidateQueries({
        queryKey: ["Events"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createEvent };
}
