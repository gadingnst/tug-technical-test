import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/libs/Common/api/auth'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
      throw redirect({ to: '/login' })
    }
    throw redirect({ to: '/admins' })
  },
  component: () => null,
})

