import { supabase } from '../lib/supabaseClient';
import LieuCard from '../components/LieuCard';
import BottomNav from '../components/BottomNav';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ cat?: string }>;
}

const CATEGORIES = ['Tout', 'Hôtels', 'Restos', 'Plages', 'Clubs', 'Bars', 'Résidences'];

export default async function Page({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const cat = resolved?.cat || '';

  let query = supabase.from('lieux').select('*').order('note', { ascending: false });
  if (cat && cat !== 'tout') {
    query = query.ilike('categorie', cat);
  }

  const { data: lieux, error } = await query;
  if (error) console.error('Erreur Supabase:', error.message);

  const vedettes = lieux?.filter(l => l.est_vedette) || [];
  const autres = lieux?.filter(l => !l.est_vedette) || [];

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24">

      {/* HEADER */}
      <div className="bg-[#F77F00] sticky top-0 z-50">
        {/* Bande drapeau */}
        <div className="flex h-[5px]">
          <div className="flex-1 bg-[#F77F00]"/>
          <div className="flex-1 bg-white"/>
          <div className="flex-1 bg-[#009A44]"/>
        </div>
        <div className="p-4 pb-3">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-white font-black text-xl tracking-tight">Abidjan</span>
              <span className="bg-white text-[#F77F00] font-black text-sm px-1.5 rounded ml-1">CI</span>
            </div>
            <Link href="/admin" className="bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Admin
            </Link>
          </div>
          <p className="text-white/70 text-[10px] uppercase tracking-widest mb-1">Bienvenue à</p>
          <h1 className="text-white font-black text-2xl leading-tight mb-3">
            Abidjan 🌴
            <span className="block text-white/60 text-sm font-normal">La perle des lagunes</span>
          </h1>
          {/* Barre de recherche */}
          <Link href="/recherche" className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="text-gray-400 text-sm">Hôtel, restaurant, plage...</span>
            <div className="ml-auto w-7 h-7 bg-[#009A44] rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M3 6h18M6 12h12M9 18h6"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* FILTRES CATÉGORIES */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 bg-white border-b border-gray-100">
        {CATEGORIES.map(c => {
          const cLow = c.toLowerCase();
          const isActive = (!cat && c === 'Tout') || cat === cLow;
          return (
            <Link
              key={c}
              href={c === 'Tout' ? '/' : `/?cat=${cLow}`}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#F77F00] text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {c}
            </Link>
          );
        })}
      </div>

      {/* VEDETTES */}
      {vedettes.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center px-4 mb-3">
            <h2 className="font-black text-base text-gray-900">Coup de cœur</h2>
            <span className="text-[10px] text-[#F77F00] font-bold uppercase">Sélection</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
            {vedettes.map(lieu => (
              <LieuCard key={lieu.id} lieu={lieu} variant="featured" />
            ))}
          </div>
        </div>
      )}

      {/* TOUS LES LIEUX */}
      <div className="mt-4 px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-black text-base text-gray-900">
            {cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'Tous les spots'}
          </h2>
          <span className="text-[10px] text-gray-400">{(autres.length + vedettes.length)} lieux</span>
        </div>
        {(lieux?.length ?? 0) === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-4">🌴</span>
            <p className="font-black text-sm text-gray-800 uppercase tracking-widest mb-2">Aucun lieu trouvé</p>
            <p className="text-xs text-gray-400">Essaie une autre catégorie</p>
            <Link href="/" className="mt-6 bg-[#F77F00] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest">
              Tout afficher
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-4">
            {(autres.length > 0 ? autres : lieux ?? []).map(lieu => (
              <LieuCard key={lieu.id} lieu={lieu} variant="grid" />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}