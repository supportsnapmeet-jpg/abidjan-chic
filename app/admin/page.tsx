import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default async function AdminPage() {
  const { data: lieux } = await supabase.from('lieux').select('*').order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-10">
      <div className="bg-[#1a1a1a] p-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white font-black text-xl">Admin Panel</h1>
            <p className="text-gray-400 text-xs mt-0.5">AbidjanChic · Gestion des lieux</p>
          </div>
          <Link href="/" className="text-gray-400 text-xs uppercase font-bold">← Site</Link>
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
          <p className="text-3xl font-black text-[#F77F00]">{lieux?.length || 0}</p>
          <p className="text-[10px] text-gray-400 uppercase mt-1">Total lieux</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
          <p className="text-3xl font-black text-[#009A44]">{lieux?.filter(l => l.est_vedette).length || 0}</p>
          <p className="text-[10px] text-gray-400 uppercase mt-1">Vedettes</p>
        </div>
      </div>

      <div className="px-4">
        <Link href="/admin/ajouter"
          className="flex items-center justify-center gap-2 w-full bg-[#F77F00] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest mb-4">
          + Ajouter un lieu
        </Link>

        <h2 className="font-black text-sm text-gray-900 uppercase tracking-widest mb-3">Tous les lieux</h2>
        <div className="space-y-2">
          {lieux?.map(lieu => (
            <div key={lieu.id} className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#F77F00]/10 flex items-center justify-center text-xl">
                {lieu.categorie === 'hôtels' ? '🏨' : lieu.categorie === 'restos' ? '🍽️' : lieu.categorie === 'plages' ? '🏖️' : '📍'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-gray-900 truncate">{lieu.nom}</p>
                <p className="text-[10px] text-gray-400">{lieu.quartier} · {lieu.categorie}</p>
              </div>
              {lieu.est_vedette && (
                <span className="bg-[#F77F00] text-white text-[8px] font-black px-2 py-0.5 rounded-full">⭐</span>
              )}
              <Link href={`/admin/modifier/${lieu.id}`} className="text-[10px] text-gray-400 font-bold uppercase">Éditer</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}