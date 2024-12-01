import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
function Logout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleLogout() {
    queryClient.removeQueries();
    localStorage.removeItem("accessToken");

    navigate("/login", { replace: true });
  }

  return (
    <ButtonIcon onClick={() => handleLogout()}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
