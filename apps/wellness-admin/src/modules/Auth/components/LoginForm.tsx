import * as React from "react"
import { useAuth } from "../hooks/useAuth"
import { LoginSchema } from "@wellness/shared-typescript"
import { useNavigate } from "@tanstack/react-router"
import { Activity } from "lucide-react"

export const LoginForm: React.FC = () => {
  const { login, isLoading, loginError } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    // Client-side validation using shared Zod schema
    const parsed = LoginSchema.safeParse({ email, password })
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      parsed.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    try {
      await login({ email, password })
      // Redirect to dashboard on success
      navigate({ to: "/" })
    } catch (err) {
      // loginError from useMutation is handled or we can log it
      console.error('Login failed', err)
    }
  }

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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300" htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-colors`}
              />
              {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300" htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={`w-full bg-slate-950 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-colors`}
              />
              {errors.password && <p className="text-sm text-red-500 font-medium">{errors.password}</p>}
            </div>
            
            {loginError && (
               <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                 <p className="text-sm text-red-400 font-medium text-center">
                   {loginError.message || "Invalid credentials. Please try again."}
                 </p>
               </div>
            )}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg px-4 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 mt-4"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            
          </form>
        </div>
        
      </div>
    </div>
  )
}
