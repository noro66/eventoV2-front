import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../services/apiEvents";

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

  return {
    isPending,
    Events,
    error,
  };
}
