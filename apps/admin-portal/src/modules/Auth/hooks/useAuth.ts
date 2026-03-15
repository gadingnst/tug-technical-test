import { useMutation } from "@tanstack/react-query"
import { login, logout, changePassword, useSession } from "@/libs/Common/api/auth"
import type { LoginInput } from "@wellness/shared-typescript"

export const useAuth = () => {
  const { data: sessionData, isPending: isSessionLoading, refetch } = useSession()

  const { mutateAsync: loginMutation, isPending: isLoggingIn, error: loginError } = useMutation({
    mutationFn: (credentials: LoginInput) => login(credentials),
    onSuccess: () => {
      refetch();
    }
  })

  const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      refetch();
    }
  })

  const { mutateAsync: changePasswordMutation, isPending: isChangingPassword, error: changePasswordError } = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) => changePassword(data)
  })

  return {
    session: sessionData,
    isAuthenticated: !!sessionData?.user,
    isLoading: isSessionLoading || isLoggingIn || isLoggingOut || isChangingPassword,
    login: loginMutation,
    loginError,
    logout: logoutMutation,
    changePassword: changePasswordMutation,
    isChangingPassword,
    changePasswordError,
  }
}
