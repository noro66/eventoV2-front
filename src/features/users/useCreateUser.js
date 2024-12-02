import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditUser } from "../../services/apiUsers"; // Import your API function
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: createEditUser, // API function for creating/editing a user
    onSuccess: () => {
      toast.success("New user successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["Users"], // Ensure the users list is refetched
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create user.");
    },
  });

  return { isCreating, createUser };
}
