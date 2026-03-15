import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/libs/Common/api/auth'
import { LoginPage } from '@/modules/Auth/Login.page'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (session?.user) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})
