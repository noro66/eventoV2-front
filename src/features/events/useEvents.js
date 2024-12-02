import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../services/apiEvents";
import { getUsers } from "../../services/apiUsers";

export function useEvents() {
  const {
    isPending,
    data: Events,
    error,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery({
    queryKey: ["Events"],
    queryFn: () => getEvents(),
  });

  const {
    isPending: isLoading,
    data: Users,
    error: userError,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery({
    queryKey: ["Users"],
    queryFn: () => getUsers(),
  });

  return {
    isPending: isLoading && isLoading,
    Events,
    Users,
    error,
  };
}
