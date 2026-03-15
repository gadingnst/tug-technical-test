import { Users } from 'lucide-react'
import { Button } from '@/libs/Common/ui/Button'

export function AdminPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">User & Admin Management</h2>
          <p className="text-slate-400">Manage your administrators and platform users here.</p>
        </div>
        <Button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
          <Users className="w-4 h-4" />
          Add User
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
          <p className="text-slate-400 mb-6 max-w-sm mx-auto">Get started by creating a new user or admin to manage the platform.</p>
        </div>
      </div>
    </div>
  )
}