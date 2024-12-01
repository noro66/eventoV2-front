import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteEvent as deleteCaniApi } from "../../services/apiEvents";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteEvent } = useMutation({
    mutationFn: deleteCaniApi,
    onSuccess: () => {
      toast.success("Event successfully  deleted !");
      queryClient.invalidateQueries({
        queryKey: ["Events"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteEvent };
}
