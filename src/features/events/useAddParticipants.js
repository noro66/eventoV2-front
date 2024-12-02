import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addParticipants } from "../../services/apiEvents"; // Make sure to import your addParticipants function
import toast from "react-hot-toast";

export function useAddParticipants() {
  const queryClient = useQueryClient();

  const { mutate: addParticipantsToEvent, isPending: isAdding } = useMutation({
    mutationFn: ({ eventId, participants }) =>
      addParticipants(eventId, participants),
    onSuccess: () => {
      toast.success("Participants successfully added to the event!");
      queryClient.invalidateQueries({
        queryKey: ["Events"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isAdding, addParticipantsToEvent };
}
