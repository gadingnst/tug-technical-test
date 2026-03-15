import { createAuthClient } from "better-auth/react"
import { CORE_API_BASE_URL } from "@/configs/envs"
import type { LoginInput } from "@wellness/shared-typescript"

export const authClient = createAuthClient({
  baseURL: CORE_API_BASE_URL,
})

export const { useSession } = authClient

export async function login(data: LoginInput) {
  const res = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });
  if (res.error) throw new Error(res.error.message || 'Login failed');
  return res.data;
}

export async function logout() {
  const res = await authClient.signOut();
  if (res.error) throw new Error(res.error.message || 'Logout failed');
  return res;
}

export async function changePassword(data: { currentPassword: string; newPassword: string }) {
  const res = await authClient.changePassword({
    newPassword: data.newPassword,
    currentPassword: data.currentPassword,
    revokeOtherSessions: true,
  });
  if (res.error) throw new Error(res.error.message || 'Failed to change password');
  return res.data;
}

const authApi = {
  login,
  logout,
  changePassword,
};

export default authApi;
