import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - SkillArena</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-white">⚔️ SkillArena</div>
            <div className="space-x-4">
              <Link href="/games" className="text-white hover:text-purple-400">
                Games
              </Link>
              <Link href="/wallet" className="text-white hover:text-purple-400">
                Wallet
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="text-white hover:text-purple-400"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
              <div className="space-y-2 text-gray-300">
                <p>Name: {user.firstName} {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            </div>

            <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Links</h2>
              <div className="space-y-2">
                <Link
                  href="/games"
                  className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  Browse Games
                </Link>
                <Link
                  href="/leaderboard"
                  className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
