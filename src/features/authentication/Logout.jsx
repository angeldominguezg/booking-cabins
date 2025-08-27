import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout: userLogout, isLoading } = useLogout();

  function handleLogout() {
    userLogout();
  }

  return (
    <ButtonIcon onClick={handleLogout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
