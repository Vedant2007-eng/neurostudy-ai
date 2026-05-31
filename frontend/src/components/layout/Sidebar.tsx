"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/notes", label: "Notes Agent", icon: "📄" },
  { href: "/dashboard/quiz", label: "Quiz Agent", icon: "🧠" },
  { href: "/dashboard/planner", label: "Planner Agent", icon: "📅" },
  { href: "/dashboard/doubt", label: "Doubt Agent", icon: "🤖" },
  { href: "/dashboard/revision", label: "Revision Agent", icon: "🔔" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-6">
      
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-cyan-400">🧠 NeuroStudy AI</h1>
        <p className="text-gray-500 text-xs mt-1">Multi-Agent Study System</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm font-medium ${
                isActive
                  ? "bg-cyan-500 text-black"
                  : "text-gray-400 hover:text-cyan-400 hover:bg-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <p className="text-gray-600 text-xs text-center">NeuroStudy AI v1.0</p>
      </div>

    </div>
  );
}