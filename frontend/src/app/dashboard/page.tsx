import Sidebar from "@/components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-black">

      {/* Sidebar Component */}
      <Sidebar />

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