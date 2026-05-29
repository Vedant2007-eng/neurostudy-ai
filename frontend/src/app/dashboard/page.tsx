 export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-black">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-6">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-cyan-400">🧠 NeuroStudy AI</h1>
          <p className="text-gray-500 text-xs mt-1">Multi-Agent Study System</p>
        </div>
        <nav className="flex flex-col gap-3">
          <a href="/notes" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
            📄 Notes Agent
          </a>
          <a href="/quiz" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
            🧠 Quiz Agent
          </a>
          <a href="/planner" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
            📅 Planner Agent
          </a>
          <a href="/doubt" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
            🤖 Doubt Agent
          </a>
          <a href="/revision" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
            🔔 Revision Agent
          </a>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-8">
          <h2 className="text-white font-semibold text-lg">Dashboard</h2>
          <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-sm">
            V
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8">
          <h3 className="text-2xl font-bold text-white mb-2">Welcome back! 👋</h3>
          <p className="text-gray-400 mb-8">Upload a PDF to activate your AI agents.</p>

          {/* Agent Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-2xl mb-2">📄</p>
              <h4 className="text-white font-semibold">Notes Agent</h4>
              <p className="text-gray-500 text-sm mt-1">Generates smart notes from your PDF</p>
              <span className="text-xs text-yellow-400 mt-3 block">⏳ Waiting for PDF</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-2xl mb-2">🧠</p>
              <h4 className="text-white font-semibold">Quiz Agent</h4>
              <p className="text-gray-500 text-sm mt-1">Creates MCQs and practice questions</p>
              <span className="text-xs text-yellow-400 mt-3 block">⏳ Waiting for PDF</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-2xl mb-2">📅</p>
              <h4 className="text-white font-semibold">Planner Agent</h4>
              <p className="text-gray-500 text-sm mt-1">Builds your study timetable</p>
              <span className="text-xs text-yellow-400 mt-3 block">⏳ Waiting for PDF</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-2xl mb-2">🤖</p>
              <h4 className="text-white font-semibold">Doubt Agent</h4>
              <p className="text-gray-500 text-sm mt-1">Answers your questions instantly</p>
              <span className="text-xs text-yellow-400 mt-3 block">⏳ Waiting for PDF</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-2xl mb-2">🔔</p>
              <h4 className="text-white font-semibold">Revision Agent</h4>
              <p className="text-gray-500 text-sm mt-1">Tracks weak topics and revisions</p>
              <span className="text-xs text-yellow-400 mt-3 block">⏳ Waiting for PDF</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}