import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  useWellnessPackages,
  useCreateWellnessPackage,
  useUpdateWellnessPackage,
  useDeleteWellnessPackage
} from './useWellnessPackages'
import type { WellnessPackage } from '@wellness/shared-typescript'

export function useWellnessPackageList() {
  const { data: packages = [], isLoading, error } = useWellnessPackages()
  const { mutateAsync: createPackage, isPending: isCreating } = useCreateWellnessPackage()
  const { mutateAsync: updatePackage, isPending: isUpdating } = useUpdateWellnessPackage()
  const { mutateAsync: deletePackage, isPending: isDeleting } = useDeleteWellnessPackage()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<WellnessPackage | null>(null)

  const handleCreate = () => {
    setSelectedPackage(null)
    setIsModalOpen(true)
  }

  const handleEdit = (pkg: WellnessPackage) => {
    setSelectedPackage(pkg)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this package? This action cannot be undone.')) {
      try {
        await deletePackage(id)
        toast.success('Package deleted successfully');
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete package')
      }
    }
  }

  const handleFormSubmit = async (data: any) => {
    try {
      if (selectedPackage) {
        await updatePackage({ id: selectedPackage.id, data })
        toast.success('Package updated successfully');
      } else {
        await createPackage(data)
        toast.success('Package created successfully');
      }
      setIsModalOpen(false)
    } catch (err: any) {
      toast.error(err.message || 'Failed to save package')
    }
  }

  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(priceInCents / 100)
  }

  return {
    packages,
    isLoading,
    error,
    isModalOpen,
    setIsModalOpen,
    selectedPackage,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreate,
    handleEdit,
    handleDelete,
    handleFormSubmit,
    formatPrice
  }
}
