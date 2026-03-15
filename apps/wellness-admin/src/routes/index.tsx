import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/libs/Common/api/auth'
import { CORE_API_BASE_URL } from '../configs/envs'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
      throw redirect({ to: '/login' })
    }
  },
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Wellness Admin</h3>
      <p>Hello World 👋</p>
      <p style={{ color: '#888', fontSize: '0.9rem' }}>
        API Base URL: <code>{CORE_API_BASE_URL}</code>
      </p>
    </div>
  )
}
