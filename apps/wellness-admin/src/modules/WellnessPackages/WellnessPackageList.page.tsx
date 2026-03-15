import * as React from 'react'
import { Package, Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/libs/Common/ui/Button'
import { Modal } from '@/libs/Common/ui/Modal'
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/libs/Common/ui/Table'
import { 
  useWellnessPackages, 
  useCreateWellnessPackage, 
  useUpdateWellnessPackage, 
  useDeleteWellnessPackage 
} from './hooks/useWellnessPackages'
import { WellnessPackageForm } from './components/WellnessPackageForm'
import type { WellnessPackage } from '@wellness/shared-typescript'

export function WellnessPackageListPage() {
  const { data: packages = [], isLoading, error } = useWellnessPackages()
  const { mutateAsync: createPackage, isPending: isCreating } = useCreateWellnessPackage()
  const { mutateAsync: updatePackage, isPending: isUpdating } = useUpdateWellnessPackage()
  const { mutateAsync: deletePackage, isPending: isDeleting } = useDeleteWellnessPackage()

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedPackage, setSelectedPackage] = React.useState<WellnessPackage | null>(null)

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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Wellness Packages</h2>
          <p className="text-slate-400">Manage and configure your wellness offerings.</p>
        </div>
        <Button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-purple-500/20 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Create Package
        </Button>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
          <p className="text-red-400 font-medium">Failed to load packages. Please try again later.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Package Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-slate-400">
                    Loading packages...
                  </TableCell>
                </TableRow>
              ) : packages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-slate-400">
                    No packages found. Click "Create Package" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-500/10 p-2 rounded-lg">
                          <Package className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">{pkg.name}</div>
                          {pkg.description && (
                            <div className="text-xs text-slate-500 line-clamp-1">{pkg.description}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {pkg.duration_minutes} min
                    </TableCell>
                    <TableCell className="font-medium text-slate-200">
                      {formatPrice(pkg.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEdit(pkg)}
                          className="h-8 w-8 text-slate-400 hover:text-indigo-400"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(pkg.id)}
                          disabled={isDeleting}
                          className="h-8 w-8 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPackage ? "Edit Wellness Package" : "Create Wellness Package"}
      >
        <WellnessPackageForm
          initialData={selectedPackage || undefined}
          mode={selectedPackage ? "edit" : "create"}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}