import { createAuthClient } from "better-auth/react"
import { CORE_API_BASE_URL } from "@/configs/envs"

export const authClient = createAuthClient({
  baseURL: CORE_API_BASE_URL,
})

export const { signIn, signOut, useSession } = authClient
