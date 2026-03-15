import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/libs/Common/api/auth'

export const Route = createFileRoute('/about')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="p-2">
      <h3>About</h3>
    </div>
  )
}
