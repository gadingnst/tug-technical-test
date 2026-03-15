import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/libs/Common/api/auth'
import { WellnessPackageListPage } from '@/modules/WellnessPackages/WellnessPackageList.page'

export const Route = createFileRoute('/packages')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: WellnessPackageListPage,
})

