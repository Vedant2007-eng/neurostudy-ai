"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BookOpen, Sparkles, ChevronDown, ChevronUp,
  Tag, Clock, BarChart2, Lightbulb, FileText,
  Loader2, AlertCircle, CheckCircle2,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Document {
  _id: string;
  filename: string;
}

interface ImportantTerm {
  term: string;
  definition: string;
}

interface NotesContent {
  summary: string;
  key_points: string[];
  important_terms: ImportantTerm[];
  quick_revision: string[];
  difficulty_level: string;
  estimated_read_time: string;
  topic_tags: string[];
}

// ─── Section Card Component ───────────────────────────────────────────────────
function SectionCard({
  title, icon, children, accent = "blue",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accent?: "blue" | "purple" | "green" | "amber";
}) {
  const [open, setOpen] = useState(true);
  const borders = {
    blue: "border-blue-500/30 bg-blue-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
    green: "border-green-500/30 bg-green-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
  };
  const icons = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    green: "text-green-400",
    amber: "text-amber-400",
  };

  return (
    <div className={`rounded-xl border ${borders[accent]} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={icons[accent]}>{icon}</span>
          <span className="font-semibold text-white text-sm uppercase tracking-wide">
            {title}
          </span>
        </div>
        {open
          ? <ChevronUp size={16} className="text-gray-400" />
          : <ChevronDown size={16} className="text-gray-400" />
        }
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NotesPage() {
  const [user] = useAuthState(auth);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [notes, setNotes] = useState<NotesContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [docsLoading, setDocsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Fetch documents
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const uid = user?.uid || "test_user";
        const res = await fetch(`${API_BASE}/documents?user_id=${uid}`);
        const data = await res.json();
        setDocuments(data.documents || []);
      } catch {
        setError("Failed to load documents.");
      } finally {
        setDocsLoading(false);
      }
    };
    fetchDocs();
  }, [user]);

  const handleGenerate = async () => {
    if (!selectedDoc) return;
    setLoading(true);
    setError(null);
    setNotes(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`${API_BASE}/api/notes/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document_id: selectedDoc,
          user_id: user?.uid || "test_user",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to generate notes.");
      setNotes(data.notes);
      setSuccessMsg(data.message);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <BookOpen size={22} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold">Notes Agent</h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            AI Powered
          </span>
        </div>
        <p className="text-gray-400 text-sm ml-12">
          Select a PDF and let AI generate smart notes, key points and revision highlights.
        </p>
      </div>

      {/* Selector */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Choose a document
        </label>

        {docsLoading ? (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Loader2 size={15} className="animate-spin" /> Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No documents found.{" "}
            <a href="/dashboard/upload" className="text-blue-400 underline">
              Upload a PDF first →
            </a>
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedDoc}
              onChange={(e) => {
                setSelectedDoc(e.target.value);
                setNotes(null);
                setError(null);
              }}
              className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">-- Select a PDF --</option>
              {documents.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.filename}
                </option>
              ))}
            </select>

            <button
              onClick={handleGenerate}
              disabled={!selectedDoc || loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
            >
              {loading
                ? <Loader2 size={16} className="animate-spin" />
                : <Sparkles size={16} />
              }
              {loading ? "Generating..." : "Generate Notes"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            <AlertCircle size={15} /> {error}
          </div>
        )}
        {successMsg && !error && (
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
            <CheckCircle2 size={15} /> {successMsg}
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-900 border border-gray-800 rounded-xl" />
          ))}
        </div>
      )}

      {/* Notes Output */}
      {notes && !loading && (
        <div className="space-y-5">

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 font-semibold">
              {notes.difficulty_level}
            </span>
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Clock size={13} /> {notes.estimated_read_time}
            </span>
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <BarChart2 size={13} /> {notes.key_points.length} key points
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {notes.topic_tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          {/* Summary */}
          <SectionCard title="Summary" icon={<FileText size={17} />} accent="blue">
            <p className="text-gray-300 text-sm leading-relaxed">{notes.summary}</p>
          </SectionCard>

          {/* Key Points */}
          <SectionCard title="Key Points" icon={<CheckCircle2 size={17} />} accent="purple">
            <ul className="space-y-2">
              {notes.key_points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Important Terms */}
          <SectionCard title="Important Terms" icon={<BookOpen size={17} />} accent="green">
            <div className="space-y-3">
              {notes.important_terms.map((item, i) => (
                <div key={i} className="border-l-2 border-green-500/40 pl-4 py-1">
                  <span className="text-green-300 font-semibold text-sm">{item.term}</span>
                  <p className="text-gray-400 text-sm mt-0.5">{item.definition}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Quick Revision */}
          <SectionCard title="Quick Revision" icon={<Lightbulb size={17} />} accent="amber">
            <ul className="space-y-2">
              {notes.quick_revision.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-amber-400 mt-0.5">⚡</span> {fact}
                </li>
              ))}
            </ul>
          </SectionCard>

        </div>
      )}
    </div>
  );
}