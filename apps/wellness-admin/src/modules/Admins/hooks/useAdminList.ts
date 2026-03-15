import { useState } from 'react'
import { useAdmins, useCreateAdmin, useDeleteAdmin } from './useAdmins'
import useClipboard from '@/libs/Common/hooks/useClipboard'
import { useAuth } from '@/modules/Auth/hooks/useAuth'

export function useAdminList() {
  const { session } = useAuth()
  const { data: admins = [], isLoading, error } = useAdmins()
  const { mutateAsync: createAdmin, isPending: isCreating } = useCreateAdmin()
  const { mutateAsync: deleteAdmin, isPending: isDeleting } = useDeleteAdmin()

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [successData, setSuccessData] = useState<{ email: string, password: string } | null>(null)
  const [adminToDelete, setAdminToDelete] = useState<string | number | null>(null)

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

  const handleDeleteAdmin = async () => {
    if (!adminToDelete) return;
    try {
      await deleteAdmin(adminToDelete);
      setAdminToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete admin');
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
    isDeleting,
    isFormModalOpen,
    setIsFormModalOpen,
    successData,
    adminToDelete,
    setAdminToDelete,
    isCopied,
    copyHandler,
    handleAddAdmin,
    handleDeleteAdmin,
    handleCloseSuccess,
    currentUserId: session?.user?.id,
  }
}

