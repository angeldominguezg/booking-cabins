import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function useLogin() {

  const navigate = useNavigate();

  const {mutate: login, isLoading, error} = useMutation({
    mutationFn: ({email, password}) => loginApi({email, password}),
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Incorrect email or password");
    },
  });

  return {login, isLoading, error};
}

