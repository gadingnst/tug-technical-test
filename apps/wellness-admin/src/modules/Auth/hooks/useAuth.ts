import { useMutation, useQuery } from "@tanstack/react-query"
import { signIn, signOut, useSession } from "@/libs/Common/api/auth"
import type { LoginInput } from "@wellness/shared-typescript"

export const useAuth = () => {
  const { data: sessionData, isPending: isSessionLoading, refetch } = useSession()

  const { mutateAsync: login, isPending: isLoggingIn, error: loginError } = useMutation({
    mutationFn: async (credentials: LoginInput) => {
      const res = await signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      if (res.error) {
        throw res.error;
      }
      return res.data;
    },
    onSuccess: () => {
      refetch();
    }
  })

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      const res = await signOut();
      if (res.error) throw res.error;
      return res;
    },
    onSuccess: () => {
      refetch();
    }
  })

  return {
    session: sessionData,
    isAuthenticated: !!sessionData?.user,
    isLoading: isSessionLoading || isLoggingIn || isLoggingOut,
    login,
    loginError,
    logout
  }
}
