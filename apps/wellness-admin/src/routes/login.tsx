import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginForm } from '@/modules/Auth/components/LoginForm'
import { authClient } from '@/libs/Common/api/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (session?.user) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginForm,
})
