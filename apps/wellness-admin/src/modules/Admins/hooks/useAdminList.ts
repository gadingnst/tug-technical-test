import { useState } from 'react'
import { useAdmins, useCreateAdmin } from './useAdmins'
import useClipboard from '@/libs/Common/hooks/useClipboard'

export function useAdminList() {
  const { data: admins = [], isLoading, error } = useAdmins()
  const { mutateAsync: createAdmin, isPending: isCreating } = useCreateAdmin()

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [successData, setSuccessData] = useState<{ email: string, password: string } | null>(null)

  const { isCopied, copyHandler } = useClipboard(successData?.password || '')

  const handleAddAdmin = async (data: { email: string }) => {
    try {
      const res = await createAdmin(data);
      setIsFormModalOpen(false);
      setSuccessData({ email: data.email, password: res.data.generatedPassword });
    } catch (err: any) {
      alert(err.message || 'Failed to add admin');
    }
  }

  const handleCloseSuccess = () => {
    setSuccessData(null);
  }

  return {
    admins,
    isLoading,
    error,
    isCreating,
    isFormModalOpen,
    setIsFormModalOpen,
    successData,
    isCopied,
    copyHandler,
    handleAddAdmin,
    handleCloseSuccess
  }
}
