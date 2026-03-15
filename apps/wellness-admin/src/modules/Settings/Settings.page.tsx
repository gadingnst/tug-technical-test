import * as React from "react"
import { useAuth } from "@/modules/Auth/hooks/useAuth"
import { ChangePasswordSchema } from "@wellness/shared-typescript"
import { ShieldAlert, CheckCircle2 } from "lucide-react"

export const SettingsPage: React.FC = () => {
  const { changePassword, isChangingPassword, changePasswordError } = useAuth()
  
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccess(false)
    
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" })
      return
    }

    const parsed = ChangePasswordSchema.safeParse({ currentPassword, newPassword })
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      parsed.error.errors.forEach((err: any) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    try {
      await changePassword({ currentPassword, newPassword })
      setSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: unknown) {
      console.error('Change password failed', err)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Settings</h2>
        <p className="text-slate-400">Manage your account preferences and security.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="border-b border-slate-800 p-6 flex gap-4 items-center">
          <div className="bg-indigo-500/20 p-2 rounded-lg">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Change Password</h3>
            <p className="text-slate-400 text-sm">Update your password to keep your account secure.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <p className="text-sm font-medium">Password successfully updated. All other active sessions have been signed out.</p>
            </div>
          )}

          {changePasswordError && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-400">
              <p className="text-sm font-medium">{changePasswordError.message || "Failed to change password."}</p>
            </div>
          )}

          <div className="space-y-2 max-w-md">
            <label className="text-sm font-medium text-slate-300">Current Password</label>
            <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isChangingPassword}
              className={`w-full bg-slate-950 border ${errors.currentPassword ? 'border-red-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors`}
              placeholder="••••••••"
            />
            {errors.currentPassword && <p className="text-sm text-red-500 font-medium">{errors.currentPassword}</p>}
          </div>

          <div className="space-y-2 max-w-md">
            <label className="text-sm font-medium text-slate-300">New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isChangingPassword}
              className={`w-full bg-slate-950 border ${errors.newPassword ? 'border-red-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors`}
              placeholder="••••••••"
            />
            {errors.newPassword && <p className="text-sm text-red-500 font-medium">{errors.newPassword}</p>}
          </div>

          <div className="space-y-2 max-w-md">
            <label className="text-sm font-medium text-slate-300">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isChangingPassword}
              className={`w-full bg-slate-950 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 font-medium">{errors.confirmPassword}</p>}
          </div>

          <div className="pt-4 border-t border-slate-800 max-w-md">
            <button 
              type="submit" 
              disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg px-6 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
            >
              {isChangingPassword ? "Saving..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
