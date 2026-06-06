import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center px-6">
      <div className="text-center max-w-sm animate-fade-in-up">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-white font-bold text-xl mb-2">User not found</h2>
        <p className="text-gray-500 text-sm mb-6">
          That GitHub username doesn't exist or has been deleted.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity">
          ← Try another username
        </Link>
      </div>
    </div>
  );
}
