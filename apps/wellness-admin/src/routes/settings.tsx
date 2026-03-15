import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/libs/Common/api/auth'
import { SettingsPage } from '@/modules/Settings/Settings.page'

export const Route = createFileRoute('/settings')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: SettingsPage,
})
