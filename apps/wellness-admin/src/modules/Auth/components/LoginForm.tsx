import * as React from "react"
import { useAuth } from "../hooks/useAuth"
import { LoginSchema, type LoginInput } from "@wellness/shared-typescript"
import { Button } from "@/libs/Common/ui/Button"
import { Input } from "@/libs/Common/ui/Input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/libs/Common/ui/Card"
import { useNavigate } from "@tanstack/react-router"

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
    <Card className="w-full max-w-sm mx-auto mt-24">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Login</CardTitle>
        <CardDescription>
          Enter your email and password to access the wellness admin panel.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              disabled={isLoading}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              disabled={isLoading}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          
          {loginError && (
             <p className="text-sm text-red-500 font-medium bg-red-50 p-2 rounded-md">
               {loginError.message || "Invalid credentials. Please try again."}
             </p>
          )}
          
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
