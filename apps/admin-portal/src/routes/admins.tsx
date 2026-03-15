import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/libs/Common/api/auth'
import { AdminPage } from '@/modules/Admins/Admin.page'

export const Route = createFileRoute('/admins')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: AdminPage,
})

