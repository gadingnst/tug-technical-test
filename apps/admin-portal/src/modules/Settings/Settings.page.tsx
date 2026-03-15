import { ShieldAlert, CheckCircle2 } from "lucide-react"
import { Button } from "@/libs/Common/ui/Button"
import { Input } from "@/libs/Common/ui/Input"
import { useSettingsForm } from "./hooks/useSettingsForm"

export function SettingsPage() {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    success,
    isChangingPassword,
    changePasswordError,
    handleSubmit,
  } = useSettingsForm()

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

          <div className="max-w-md">
            <Input 
              id="currentPassword"
              type="password" 
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isChangingPassword}
              placeholder="••••••••"
              error={!!errors.currentPassword}
              errorMessage={errors.currentPassword}
            />
          </div>

          <div className="max-w-md">
            <Input 
              id="newPassword"
              type="password" 
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isChangingPassword}
              placeholder="••••••••"
              error={!!errors.newPassword}
              errorMessage={errors.newPassword}
            />
          </div>

          <div className="max-w-md">
            <Input 
              id="confirmPassword"
              type="password" 
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isChangingPassword}
              placeholder="••••••••"
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
            />
          </div>

          <div className="pt-4 border-t border-slate-800 max-w-md">
            <Button 
              type="submit" 
              disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-6 py-2 shadow-lg shadow-indigo-500/25"
            >
              {isChangingPassword ? "Saving..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

