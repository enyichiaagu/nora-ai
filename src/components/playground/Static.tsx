export default Static = () => (<div 
        className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8 flex flex-col items-center justify-center shadow-lg"
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-md mb-4">
          <Video className="h-12 w-12 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Connect</h3>
        <p className="text-white/80 text-center max-w-md">
          Your call interface will appear here once connected.
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-white/70">
          <Users className="h-4 w-4" />
          <span>Waiting for participants...</span>
        </div>
      </div>)