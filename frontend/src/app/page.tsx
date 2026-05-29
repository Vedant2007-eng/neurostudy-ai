"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-cyan-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">

      {/* Left Side */}
      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <div className="w-full max-w-md">
          
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-cyan-400">🧠</h1>
            <h2 className="text-3xl font-bold text-white mt-4">NeuroStudy AI</h2>
            <p className="text-gray-400 mt-2">Your Multi-Agent AI Study Companion</p>
          </div>

          {/* Login Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-white text-xl font-semibold mb-2">Welcome back</h3>
            <p className="text-gray-400 text-sm mb-6">Sign in to access your AI study agents</p>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
            >
              <span className="text-xl">G</span>
              <span>Continue with Google</span>
            </button>

            <p className="text-gray-600 text-xs text-center mt-6">
              By signing in you agree to our terms of service
            </p>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center px-12">
        <div className="max-w-md text-center">
          <p className="text-gray-400 text-sm mb-8 uppercase tracking-widest">What you get</p>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-800 rounded-xl p-4 text-left">
              <p className="text-cyan-400 font-semibold">📄 Notes Agent</p>
              <p className="text-gray-400 text-sm mt-1">Auto-generates smart notes from any PDF</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-left">
              <p className="text-cyan-400 font-semibold">🧠 Quiz Agent</p>
              <p className="text-gray-400 text-sm mt-1">Creates MCQs with difficulty levels</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-left">
              <p className="text-cyan-400 font-semibold">📅 Planner Agent</p>
              <p className="text-gray-400 text-sm mt-1">Builds your personalized study timetable</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-left">
              <p className="text-cyan-400 font-semibold">🤖 Doubt Agent</p>
              <p className="text-gray-400 text-sm mt-1">Answers your questions instantly</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-left">
              <p className="text-cyan-400 font-semibold">🔔 Revision Agent</p>
              <p className="text-gray-400 text-sm mt-1">Tracks weak topics and revision schedule</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}