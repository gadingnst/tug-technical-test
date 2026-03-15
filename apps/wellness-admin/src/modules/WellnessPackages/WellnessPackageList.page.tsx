import { Package, Plus } from 'lucide-react'
import { Button } from '@/libs/Common/ui/Button'

export function WellnessPackageListPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Wellness Packages</h2>
          <p className="text-slate-400">Manage and configure your wellness offerings.</p>
        </div>
        <Button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg">
          <Plus className="w-4 h-4" />
          Create Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm hover:border-purple-500/50 transition-colors group">
            <div className="h-32 bg-slate-800 relative">
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md text-slate-300">
                Active
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3 text-purple-400">
                <Package className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Premium Plan</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">Digital Wellness Basic</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">Complete digital wellness tracking with advanced analytics and personalized daily insights.</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-2xl font-bold text-white">$49<span className="text-sm font-normal text-slate-500">/mo</span></span>
                <Button variant="ghost" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-transparent px-0 h-auto">Edit</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}