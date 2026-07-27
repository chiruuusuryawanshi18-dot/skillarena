import Head from 'next/head';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <>
      <Head>
        <title>SkillArena - Skill-Based Gaming Platform</title>
        <meta name="description" content="Compete in skill-based games and win demo credits" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-white">⚔️ SkillArena</div>
            <div className="space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="text-white hover:text-purple-400">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="text-white hover:text-purple-400">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-white hover:text-purple-400">
                    Login
                  </Link>
                  <Link href="/register" className="text-white hover:text-purple-400">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Welcome to SkillArena
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compete in skill-based games, climb the leaderboards, and win demo credits
            </p>
            {!user ? (
              <div className="space-x-4">
                <Link
                  href="/register"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="inline-block border border-purple-600 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600/10"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <Link
                href="/games"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Play Games
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: '🎮 Multiple Games',
                description: 'Play Chess, Quiz Battle, Carrom, and more',
              },
              {
                title: '🏆 Leaderboards',
                description: 'Compete globally and climb the rankings',
              },
              {
                title: '💰 Demo Credits',
                description: 'Play with virtual credits, no real money required',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
