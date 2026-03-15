import * as React from "react"
import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "@/modules/Auth/hooks/useAuth"
import { LoginSchema } from "@wellness/shared-typescript"

export const useLoginForm = () => {
  const { login, isLoading, loginError } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

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
      navigate({ to: "/" })
    } catch (err) {
      console.error('Login failed', err)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    loginError,
    handleSubmit,
  }
}
