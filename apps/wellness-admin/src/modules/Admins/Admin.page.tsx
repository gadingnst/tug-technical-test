import { Users, Plus, CheckCircle2, Copy, Trash2, ShieldAlert } from 'lucide-react'
import { Button } from '@/libs/Common/ui/Button'
import { Modal } from '@/libs/Common/ui/Modal'
import { AddAdminForm } from './components/AddAdminForm'
import { useAdminList } from './hooks/useAdminList'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/libs/Common/ui/Table'
import { type Admin } from '@wellness/shared-typescript'

export function AdminPage() {
  const {
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
    currentUserId
  } = useAdminList()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">User & Admin Management</h2>
          <p className="text-slate-400">Manage your administrators and platform users here.</p>
        </div>
        <Button 
          onClick={() => setIsFormModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-indigo-500/20 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Admin
        </Button>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
          <p className="text-red-400 font-medium">Failed to load admins. Please try again later.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-slate-400">
                    Loading admins...
                  </TableCell>
                </TableRow>
              ) : admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-slate-400" />
                      </div>
                      <p>No admins found. Get started by creating a new admin.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((admin: Admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium text-slate-200">
                      {admin.user_id}
                      {currentUserId === admin.user_id && (
                        <span className="ml-2 text-xs text-indigo-400">(You)</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {admin.email || "—"}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Admin
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {currentUserId !== admin.user_id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                          title="Delete Admin"
                          onClick={() => setAdminToDelete(admin.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Admin Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => !isCreating && setIsFormModalOpen(false)}
        title="Add New Admin"
      >
        <AddAdminForm
          onSubmit={handleAddAdmin}
          isLoading={isCreating}
          onCancel={() => setIsFormModalOpen(false)}
        />
      </Modal>

      {/* Success Modal to show generated password */}
      <Modal
        isOpen={!!successData}
        onClose={handleCloseSuccess}
        title="Admin Created Successfully"
      >
        {successData && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            
            <p className="text-slate-300">
              New admin account for <strong className="text-white">{successData.email}</strong> has been created.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
              <p className="text-sm text-slate-400 text-left">Generated Password:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 block text-left bg-slate-900 border border-slate-700 rounded px-3 py-2 text-indigo-400 font-mono text-lg font-bold">
                  {successData.password}
                </code>
                <Button
                  onClick={copyHandler}
                  variant={isCopied ? "default" : "outline"}
                  className={isCopied ? "bg-green-600 hover:bg-green-700 text-white border-green-600" : ""}
                >
                  {isCopied ? (
                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Copied</>
                  ) : (
                    <><Copy className="w-4 h-4 mr-2" /> Copy</>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-left">
              <p className="text-amber-400/90 text-sm">
                <strong>Important:</strong> Please copy and safely share this password with the new administrator. You will not be able to see this password again.
              </p>
            </div>

            <div className="pt-4">
              <Button onClick={handleCloseSuccess} className="w-full">
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!adminToDelete}
        onClose={() => !isDeleting && setAdminToDelete(null)}
        title="Remove Administrator"
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Are you absolutely sure?</h3>
              <p className="text-sm text-slate-400 max-w-[280px] mx-auto">
                This action cannot be undone. This will permanently remove the administrator and delete their account from the platform.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setAdminToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteAdmin}
              disabled={isDeleting}
            >
              {isDeleting ? "Removing..." : "Remove Admin"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}