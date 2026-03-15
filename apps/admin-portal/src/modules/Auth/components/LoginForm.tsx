import { Input } from "@/libs/Common/ui/Input"
import { Button } from "@/libs/Common/ui/Button"
import { useLoginForm } from "@/modules/Auth/hooks/useLoginForm"

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    loginError,
    handleSubmit,
  } = useLoginForm()

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          error={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          error={!!errors.password}
          errorMessage={errors.password}
        />
        {loginError && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-sm text-red-400 font-medium text-center">
              {loginError.message || "Invalid credentials. Please try again."}
            </p>
          </div>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-3 shadow-lg shadow-indigo-500/25 mt-4"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  )
}
