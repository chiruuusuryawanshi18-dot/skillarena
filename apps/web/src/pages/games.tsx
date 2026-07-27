import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/auth';

export default function Games() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: games = [], isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => api.get('/games').then((res) => res.data),
  });

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>Games - SkillArena</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-white">⚔️ SkillArena</div>
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">Available Games</h1>

          {isLoading ? (
            <div className="text-white text-center py-12">Loading games...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game: any) => (
                <div key={game.id} className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                  <p className="text-gray-300 mb-4">{game.description}</p>
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <p>Entry Fee: {game.baseEntryFee} credits</p>
                    <p>Players: {game.minPlayers}-{game.maxPlayers}</p>
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold">
                    Play Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
