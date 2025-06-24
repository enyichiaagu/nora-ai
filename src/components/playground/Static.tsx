import { Users } from 'lucide-react'

function Static(): JSX.Element {
  return (
    <>
      <h3 className="text-xl font-semibold text-white mb-2">Ready to Connect</h3>
      <div className="flex items-center gap-2 mt-4 text-sm text-white/70">
        <Users className="h-4 w-4" />
        <span>Waiting for participants...</span>
      </div>
    </>
  )
}

export default Static