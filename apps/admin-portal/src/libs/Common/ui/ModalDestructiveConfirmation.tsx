import { useEffect, useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/libs/Common/ui/Button'
import { Modal } from '@/libs/Common/ui/Modal'
import useCountdown from '@/libs/Common/hooks/useCountdown'

interface ModalDestructiveConfirmationProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  confirmText?: string
  loadingText?: string
  isLoading?: boolean
  onConfirm: () => void
}

export function ModalDestructiveConfirmation({
  isOpen,
  onClose,
  title,
  description = "This action cannot be undone.",
  confirmText = "Delete",
  loadingText = "Deleting...",
  isLoading = false,
  onConfirm
}: ModalDestructiveConfirmationProps) {
  const [countdown, resetCountdown] = useCountdown();
  const [isSubmitReady, setIsSubmitReady] = useState(false);
  const isSubmitDisabled = !isSubmitReady || isLoading;

  useEffect(() => {
    setIsSubmitReady(false);
    if (isOpen) {
      resetCountdown(5);
    }
  }, [isOpen]);

  useEffect(() => {
    if (countdown === 0) {
      setIsSubmitReady(true);
    }
  }, [countdown])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isLoading && onClose()}
      title={title}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-2">Are you absolutely sure?</h3>
            <p className="text-sm text-slate-400 max-w-[280px] mx-auto">
              {description}
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
            disabled={isSubmitDisabled}
          >
            {isLoading ? loadingText : (countdown !== null && countdown > 0) ? `${confirmText} (${countdown})` : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
