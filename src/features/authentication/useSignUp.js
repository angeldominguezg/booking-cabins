import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {

  const {mutate: signup, isLoading, error} = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account created successfully! Please verify your email.")
    }
  });

  return {signup, isLoading, error};

}