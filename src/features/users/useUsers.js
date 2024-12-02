import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers"; // Import the API function to fetch users

export function useUsers() {
  const {
    isPending,
    data: users,
    error,
  } = useQuery({
    queryKey: ["Users"], // Cache key for user data
    queryFn: getUsers, // Function that fetches users data
  });

  return {
    isPending,
    users,
    error,
  };
}
