import { supabase } from '../../../lib/supabaseClient';
import BottomNav from '../../../components/BottomNav';
import CarteMap from '../../../components/CarteMap';
import Link from 'next/link';

export default async function LieuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: lieu } = await supabase.from('lieux').select('*').eq('id', id).single();

  if (!lieu) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-gray-500">Lieu introuvable</p>
      <Link href="/" className="mt-4 text-[#F77F00] font-bold">Retour</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-28">
      {/* Image / Header */}
      <div className="relative h-64 bg-[#F77F00] flex items-center justify-center">
        {lieu.image_url
          ? <img src={lieu.image_url} alt={lieu.nom} className="w-full h-full object-cover"/>
          : <span className="text-7xl">🏨</span>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
        <Link href="/" className="absolute top-4 left-4 w-9 h-9 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold text-lg">←</Link>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="bg-[#F77F00] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">{lieu.categorie}</span>
          <h1 className="text-white font-black text-2xl mt-2 leading-tight">{lieu.nom}</h1>
          <p className="text-white/70 text-xs mt-1">📍 {lieu.quartier}, Abidjan</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Infos rapides */}
        <div className="bg-white rounded-2xl p-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[#F77F00] font-black text-base">{lieu.note} ★</p>
            <p className="text-[10px] text-gray-400 uppercase">Note</p>
          </div>
          <div>
            <p className="text-[#009A44] font-black text-sm">{lieu.prix || 'Gratuit'}</p>
            <p className="text-[10px] text-gray-400 uppercase">Prix</p>
          </div>
          <div>
            <p className="text-gray-800 font-black text-sm">{lieu.quartier}</p>
            <p className="text-[10px] text-gray-400 uppercase">Quartier</p>
          </div>
        </div>

        {/* Description */}
        {lieu.description && (
          <div className="bg-white rounded-2xl p-4">
            <h2 className="font-black text-sm text-gray-900 uppercase tracking-widest mb-2">À propos</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{lieu.description}</p>
          </div>
        )}

        {/* Contact */}
        {lieu.telephone && (
          <div className="bg-white rounded-2xl p-4">
            <h2 className="font-black text-sm text-gray-900 uppercase tracking-widest mb-3">Contact</h2>
            <a href={`tel:${lieu.telephone}`} className="flex items-center gap-3 text-sm text-[#F77F00] font-bold">
              📞 {lieu.telephone}
            </a>
          </div>
        )}

        {/* Carte Google Maps */}
        {lieu.latitude && lieu.longitude && (
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="p-4 pb-2">
              <h2 className="font-black text-sm text-gray-900 uppercase tracking-widest">Localisation</h2>
            </div>
            <CarteMap lat={lieu.latitude} lng={lieu.longitude} nom={lieu.nom} />
          </div>
        )}

        {/* WhatsApp */}
        
          href={`https://wa.me/2250000000000?text=Bonjour, je suis intéressé par ${lieu.nom}`}
          target="_blank"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider"
        >
          💬 Contacter via WhatsApp
        </a>
      </div>

      <BottomNav />
    </div>
  );
}