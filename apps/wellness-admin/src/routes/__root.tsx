import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Sidebar } from '../libs/Common/ui/Sidebar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const isLoginPage = window.location.pathname === '/login'

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {!isLoginPage && <Sidebar />}
      
      <main className="flex-1 overflow-auto h-screen relative">
        <div className="p-8 h-full">
          <Outlet />
        </div>
      </main>

      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </div>
  )
}
