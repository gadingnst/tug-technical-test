import * as React from "react"
import { useState } from "react"
import { useAuth } from "@/modules/Auth/hooks/useAuth"
import { ChangePasswordSchema } from "@wellness/shared-typescript"

export const useSettingsForm = () => {
  const { changePassword, isChangingPassword, changePasswordError } = useAuth()
  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

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

  return {
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
  }
}
