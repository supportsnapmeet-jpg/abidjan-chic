import Link from 'next/link';

const CAT_COLORS: Record<string, string> = {
  hôtels: 'bg-[#F77F00]',
  restos: 'bg-[#009A44]',
  plages: 'bg-[#0077b6]',
  clubs: 'bg-[#1a1a1a]',
  bars: 'bg-[#6d2d92]',
  résidences: 'bg-[#c1440e]',
};

const CAT_EMOJI: Record<string, string> = {
  hôtels: '🏨', restos: '🍽️', plages: '🏖️',
  clubs: '🎶', bars: '🥂', résidences: '🏠',
};

export default function LieuCard({ lieu, variant }: { lieu: any; variant: 'featured' | 'grid' }) {
  const catKey = lieu.categorie?.toLowerCase() || '';
  const bgColor = CAT_COLORS[catKey] || 'bg-gray-400';
  const emoji = CAT_EMOJI[catKey] || '📍';

  if (variant === 'featured') {
    return (
      <Link href={`/lieu/${lieu.id}`} className="min-w-[220px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0 block">
        <div className={`h-28 ${bgColor} flex items-center justify-center relative`}>
          {lieu.image_url
            ? <img src={lieu.image_url} alt={lieu.nom} className="w-full h-full object-cover"/>
            : <span className="text-5xl">{emoji}</span>
          }
          <span className="absolute top-2 left-2 bg-[#009A44] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">⭐ Vedette</span>
        </div>
        <div className="p-3">
          <p className="font-black text-sm text-gray-900 leading-tight">{lieu.nom}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{lieu.quartier} · {lieu.categorie}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[11px] font-bold text-[#F77F00]">{lieu.prix || 'Prix sur demande'}</span>
            <span className="text-[10px] text-[#F77F00]">★ {lieu.note}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/lieu/${lieu.id}`} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm block">
      <div className={`h-24 ${bgColor} flex items-center justify-center relative`}>
        {lieu.image_url
          ? <img src={lieu.image_url} alt={lieu.nom} className="w-full h-full object-cover"/>
          : <span className="text-4xl">{emoji}</span>
        }
        <span className="absolute top-2 left-2 bg-black/50 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">{lieu.categorie}</span>
      </div>
      <div className="p-2.5">
        <p className="font-black text-[12px] text-gray-900 leading-tight line-clamp-1">{lieu.nom}</p>
        <p className="text-[9px] text-gray-400 mt-0.5">{lieu.quartier}</p>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[10px] font-bold text-[#009A44]">{lieu.prix || 'Gratuit'}</span>
          <span className="text-[9px] text-[#F77F00]">★ {lieu.note}</span>
        </div>
      </div>
    </Link>
  );
}