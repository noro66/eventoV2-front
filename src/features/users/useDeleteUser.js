import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../../services/apiUsers"; // Import the API function

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi, // API function for deleting a user
    onSuccess: () => {
      toast.success("User successfully deleted!");
      queryClient.invalidateQueries({
        queryKey: ["Users"], // Refetch the user list after deletion
      });
    },
    onError: (err) => toast.error(err.message || "Failed to delete user."),
  });

  return { isDeleting, deleteUser };
}
