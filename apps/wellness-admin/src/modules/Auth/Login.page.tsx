import { Activity } from "lucide-react"
import { LoginForm } from "./components/LoginForm";

export function LoginPage() {
  return (
    <div className="min-h-full flex items-center justify-center -mt-16">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-500 p-3 rounded-2xl mb-4 shadow-lg shadow-indigo-500/30">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Wellness Admin
          </h1>
          <p className="text-slate-400 mt-2 text-center">
            Sign in to manage the platform
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
