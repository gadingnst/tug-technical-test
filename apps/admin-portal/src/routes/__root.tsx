import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'

import { Sidebar } from '@/libs/Common/ui/Sidebar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const routerState = useRouterState();
  const isLoginPage = routerState.location.pathname === '/login';

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {!isLoginPage && <Sidebar />}

      <main className="flex-1 overflow-auto h-screen relative">
        <div className="p-8 h-full">
          <Outlet />
        </div>
      </main>

      <Toaster position="top-right" />
      <React.Suspense fallback={null}>
        <TanStackRouterDevtools position="bottom-right" />
      </React.Suspense>
    </div>
  )
}
