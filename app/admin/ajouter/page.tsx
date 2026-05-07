'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Hôtels', 'Restos', 'Plages', 'Clubs', 'Bars', 'Résidences'];
const QUARTIERS = ['Cocody', 'Plateau', 'Marcory', 'Treichville', 'Bietry', 'Yopougon', 'Adjamé', 'Port-Bouët'];

export default function AjouterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: '', categorie: 'Hôtels', quartier: 'Cocody',
    description: '', prix: '', note: '4.5',
    image_url: '', telephone: '',
    latitude: '', longitude: '', est_vedette: false,
  });

  const handleSubmit = async () => {
    if (!form.nom || !form.categorie) {
      alert('Nom et catégorie obligatoires');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('lieux').insert([{
      ...form,
      categorie: form.categorie.toLowerCase(),
      note: parseFloat(form.note),
      latitude: form.latitude ? parseFloat(form.latitude) : null,
      longitude: form.longitude ? parseFloat(form.longitude) : null,
    }]);
    setLoading(false);
    if (error) { alert('Erreur: ' + error.message); return; }
    alert('✅ Lieu ajouté !');
    router.push('/admin');
  };

  const inputClass = "w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 outline-none focus:border-[#F77F00] transition-all";
  const labelClass = "text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-1 block";

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-10">
      <div className="bg-[#1a1a1a] p-5 flex items-center gap-4 sticky top-0 z-50">
        <button onClick={() => router.back()} className="text-white text-xl">←</button>
        <h1 className="text-white font-black text-lg">Ajouter un lieu</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4 border border-gray-100">
          <h2 className="font-black text-sm uppercase tracking-widest text-gray-800">Informations</h2>
          <div>
            <label className={labelClass}>Nom du lieu *</label>
            <input className={inputClass} placeholder="Ex: Sofitel Hôtel Ivoire"
              value={form.nom} onChange={e => setForm({...form, nom: e.target.value})}/>
          </div>
          <div>
            <label className={labelClass}>Catégorie *</label>
            <select className={inputClass} value={form.categorie} onChange={e => setForm({...form, categorie: e.target.value})}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Quartier *</label>
            <select className={inputClass} value={form.quartier} onChange={e => setForm({...form, quartier: e.target.value})}>
              {QUARTIERS.map(q => <option key={q}>{q}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea className={inputClass} rows={3} placeholder="Décrivez ce lieu..."
              value={form.description} onChange={e => setForm({...form, description: e.target.value})}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4 border border-gray-100">
          <h2 className="font-black text-sm uppercase tracking-widest text-gray-800">Prix & Note</h2>
          <div>
            <label className={labelClass}>Prix</label>
            <input className={inputClass} placeholder="Ex: dès 50 000 FCFA"
              value={form.prix} onChange={e => setForm({...form, prix: e.target.value})}/>
          </div>
          <div>
            <label className={labelClass}>Note (sur 5)</label>
            <input className={inputClass} type="number" min="1" max="5" step="0.1"
              value={form.note} onChange={e => setForm({...form, note: e.target.value})}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4 border border-gray-100">
          <h2 className="font-black text-sm uppercase tracking-widest text-gray-800">Contact & Médias</h2>
          <div>
            <label className={labelClass}>Téléphone</label>
            <input className={inputClass} placeholder="Ex: +225 07 00 00 00 00"
              value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})}/>
          </div>
          <div>
            <label className={labelClass}>URL Image</label>
            <input className={inputClass} placeholder="https://..."
              value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4 border border-gray-100">
          <h2 className="font-black text-sm uppercase tracking-widest text-gray-800">Localisation GPS</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Latitude</label>
              <input className={inputClass} placeholder="5.3599..."
                value={form.latitude} onChange={e => setForm({...form, latitude: e.target.value})}/>
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input className={inputClass} placeholder="-4.0082..."
                value={form.longitude} onChange={e => setForm({...form, longitude: e.target.value})}/>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100">
          <div>
            <p className="font-black text-sm text-gray-900">Mettre en vedette</p>
            <p className="text-[10px] text-gray-400">Affiché en coup de cœur</p>
          </div>
          <button onClick={() => setForm({...form, est_vedette: !form.est_vedette})}
            className={`w-12 h-6 rounded-full transition-all ${form.est_vedette ? 'bg-[#F77F00]' : 'bg-gray-200'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-all mx-0.5 ${form.est_vedette ? 'translate-x-6' : ''}`}/>
          </button>
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all ${loading ? 'bg-gray-300' : 'bg-[#F77F00] active:scale-95'}`}>
          {loading ? 'Enregistrement...' : '✅ Ajouter ce lieu'}
        </button>
      </div>
    </div>
  );
}