import { useState } from 'react'
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
      } catch (err) {
        alert('Failed to delete package')
      }
    }
  }

  const handleFormSubmit = async (data: any) => {
    try {
      if (selectedPackage) {
        await updatePackage({ id: selectedPackage.id, data })
      } else {
        await createPackage(data)
      }
      setIsModalOpen(false)
    } catch (err) {
      alert('Failed to save package')
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
