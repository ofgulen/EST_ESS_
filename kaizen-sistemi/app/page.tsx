'use client';

import React, { useState } from 'react';

export default function ESTDashboard() {
  const [activeView, setActiveView] = useState<'home' | 'form' | 'tracking'>('home');
  
  const [formData, setFormData] = useState({
    baslik: '',
    mevcutDurum: '',
    onerilenDurum: '',
    departman: 'Üretim',
    adSoyad: '',
    calisanNo: '',
    fotograf: null as File | null
  });

  const [suggestions, setSuggestions] = useState([
    {
      oneriId: 1,
      baslik: 'Montaj Hattı pnömatik destek entegrasyonu',
      mevcutDurum: 'Vidalama istasyonlarında personel manuel aletler kullanıyor, bu da gün sonunda ciddi ergonomik sorunlara ve yorgunluğa yol açıyor.',
      onerilenDurum: 'Manuel vidalama istasyonlarına pnömatik askı sistemleri kurularak aletlerin ağırlığının hafifletilmesi ve işlemlerin hızlandırılması.',
      departman: 'Üretim',
      adSoyad: 'Örnek Çalışan',
      durum: 'DEĞERLENDİRMEDE',
      duyguSkoru: 0.85,
      fotografVar: true,
      calisanNo: '10452'
    }
  ]);

  const handleOpenForm = (prefix = '') => {
    setFormData({ ...formData, baslik: prefix ? `[${prefix}] ` : '' });
    setActiveView('form');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fotograf: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.baslik || !formData.mevcutDurum || !formData.onerilenDurum || !formData.calisanNo || !formData.adSoyad) return;

    const newSuggestion = {
      oneriId: suggestions.length + 1,
      baslik: formData.baslik,
      mevcutDurum: formData.mevcutDurum,
      onerilenDurum: formData.onerilenDurum,
      departman: formData.departman,
      adSoyad: formData.adSoyad,
      durum: 'YENI',
      duyguSkoru: 0.92,
      fotografVar: !!formData.fotograf,
      calisanNo: formData.calisanNo
    };

    setSuggestions([newSuggestion, ...suggestions]);
    setFormData({ 
      baslik: '', 
      mevcutDurum: '', 
      onerilenDurum: '',
      departman: 'Üretim', 
      adSoyad: '',
      calisanNo: '',
      fotograf: null 
    });
    
    setActiveView('tracking');
  };

  return (
    <main className="min-h-screen bg-white text-emerald-950 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* ÜST MENÜ (NAVBAR) */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b border-emerald-100 pb-5 gap-4">
          <div className="cursor-pointer text-center sm:text-left" onClick={() => setActiveView('home')}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-teal-600 bg-clip-text text-transparent">
              Eyüp Sabri Tuncer Öneri Sistemi
            </h1>
            <p className="text-sm text-emerald-700/70 mt-1 font-medium">Fikirlerinle Süreçleri Dönüştür</p>
          </div>
          <div className="flex gap-3 bg-emerald-50/50 p-1.5 rounded-xl border border-emerald-100">
            <button
              onClick={() => setActiveView('home')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeView === 'home' ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200' : 'text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              🏠 Ana Sayfa
            </button>
            <button
              onClick={() => setActiveView('tracking')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeView === 'tracking' 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
                  : 'text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              📊 Önerileri Takip Et
            </button>
          </div>
        </header>

        {/* 1. GÖRÜNÜM: KARŞILAMA EKRANI VE ODAK KONULARI */}
        {activeView === 'home' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center py-4">
              <h2 className="text-3xl font-bold text-emerald-900 mb-3">Sürekli İyileştirme Platformuna Hoş Geldiniz</h2>
              <p className="text-emerald-700 text-lg">Bu hafta hangi süreci iyileştiriyoruz?</p>
            </div>

            {/* Haftanın ve Ayın Konusu Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Haftanın Konusu */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-7 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">
                  HAFTANIN ODAK KONUSU
                </div>
                <div className="text-4xl mb-3 mt-2">⚙️</div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">Üretim Hattı Ergonomisi</h3>
                <p className="text-emerald-800/80 text-sm mb-6 min-h-[60px]">
                  Montaj ve üretim istasyonlarında çalışan konforunu artıracak, fiziksel yorgunluğu azaltacak donanım veya süreç iyileştirme fikirleri.
                </p>
                <button 
                  onClick={() => handleOpenForm('Haftalık Odak')}
                  className="w-full bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-300 py-3 rounded-xl text-sm font-bold transition-all shadow-sm"
                >
                  Bu Konuda Öneri Ver
                </button>
              </div>

              {/* Ayın Konusu */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-7 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">
                  AYIN ODAK KONUSU
                </div>
                <div className="text-4xl mb-3 mt-2">📦</div>
                <h3 className="text-xl font-bold text-teal-900 mb-3">Lojistik ve Stok Optimizasyonu</h3>
                <p className="text-teal-800/80 text-sm mb-6 min-h-[60px]">
                  Depo yaşlandırma takibi, stok maliyetlerinin düşürülmesi ve sevkiyat ağlarındaki darboğazları çözecek analitik yaklaşımlar.
                </p>
                <button 
                  onClick={() => handleOpenForm('Aylık Odak')}
                  className="w-full bg-white hover:bg-teal-100 text-teal-700 border border-teal-300 py-3 rounded-xl text-sm font-bold transition-all shadow-sm"
                >
                  Bu Konuda Öneri Ver
                </button>
              </div>

            </div>

            {/* Bağımsız Genel Öneri Girişi */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-10 text-center mt-8 shadow-sm">
              <div className="w-20 h-20 bg-white border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-3">Farklı Bir Fikriniz Mi Var?</h3>
              <p className="text-emerald-700/80 text-sm mb-8 max-w-xl mx-auto font-medium">
                Odak konuları dışında, şirketimizin herhangi bir departmanında verimliliği, kaliteyi veya tasarrufu artıracak bağımsız bir fikriniz varsa çekinmeden paylaşın!
              </p>
              <button 
                onClick={() => handleOpenForm()}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                + Genel Öneri Girişi Yap
              </button>
            </div>
          </div>
        )}

        {/* 2. GÖRÜNÜM: ÖNERİ GİRİŞ FORMU */}
        {activeView === 'form' && (
          <form onSubmit={handleSubmit} className="bg-white border border-emerald-200 rounded-2xl p-8 space-y-6 max-w-3xl mx-auto shadow-xl shadow-emerald-100/50 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-4">
              <h2 className="text-xl font-bold text-emerald-900">Yeni Öneri Oluştur</h2>
              <button type="button" onClick={() => setActiveView('home')} className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold">
                ✕ İptal
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  required
                  value={formData.adSoyad}
                  onChange={(e) => setFormData({ ...formData, adSoyad: e.target.value })}
                  placeholder="Adınız ve Soyadınız"
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-emerald-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-2">Çalışan No</label>
                <input
                  type="number"
                  required
                  value={formData.calisanNo}
                  onChange={(e) => setFormData({ ...formData, calisanNo: e.target.value })}
                  placeholder="Sicil Numaranız"
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-emerald-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-emerald-800 mb-2">İlgili Departman</label>
                <select
                  value={formData.departman}
                  onChange={(e) => setFormData({ ...formData, departman: e.target.value })}
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
                >
                  <option value="Üretim">Üretim</option>
                  <option value="Kalite">Kalite Güvence</option>
                  <option value="Planlama">Planlama & Lojistik</option>
                  <option value="ARGE">AR-GE</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-emerald-800 mb-2">Öneri Başlığı</label>
                <input
                  type="text"
                  required
                  value={formData.baslik}
                  onChange={(e) => setFormData({ ...formData, baslik: e.target.value })}
                  placeholder="Örn: Paketleme alanında ergonomik iyileştirme"
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-emerald-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-emerald-800 mb-2">Şu Anki Durum (Sorun / Aksaklık)</label>
                <textarea
                  required
                  rows={3}
                  value={formData.mevcutDurum}
                  onChange={(e) => setFormData({ ...formData, mevcutDurum: e.target.value })}
                  placeholder="Mevcut işleyişte aksayan, maliyet yaratan veya yavaşlatan durum nedir?"
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-emerald-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-emerald-800 mb-2">Önerilen Durum (Çözüm Fikriniz)</label>
                <textarea
                  required
                  rows={3}
                  value={formData.onerilenDurum}
                  onChange={(e) => setFormData({ ...formData, onerilenDurum: e.target.value })}
                  placeholder="Bu sorunu nasıl çözebiliriz? Sisteme/sürece ne eklenmeli?"
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-emerald-300"
                />
              </div>

              <div className="md:col-span-2 border-2 border-dashed border-emerald-200 rounded-xl p-6 bg-emerald-50/30 text-center hover:bg-emerald-50/80 transition-colors">
                <label className="cursor-pointer block">
                  <span className="text-3xl block mb-2">📸</span>
                  <span className="text-sm font-bold text-emerald-700 block mb-1">Sorunu veya Çözümü Gösteren Bir Fotoğraf Ekle</span>
                  <span className="text-xs text-emerald-500 block mb-4">(İsteğe bağlı - JPG, PNG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="inline-block bg-white border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm">
                    {formData.fotograf ? formData.fotograf.name : 'Dosya Seç'}
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 rounded-xl shadow-md transition-all mt-4 text-lg"
            >
              Öneriyi Gönder ve Analizi Başlat
            </button>
          </form>
        )}

        {/* 3. GÖRÜNÜM: DURUM TAKİBİ */}
        {activeView === 'tracking' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6">Öneriler ve Durumları</h2>
            {suggestions.map((item) => (
              <div key={item.oneriId} className="bg-white border border-emerald-100 rounded-2xl p-6 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-emerald-800">{item.baslik}</h3>
                  <span className={`px-4 py-1.5 text-xs rounded-full font-bold tracking-wide shadow-sm ${
                    item.durum === 'YENI' ? 'bg-teal-100 text-teal-800 border border-teal-200' : 
                    'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {item.durum}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-5">
                  <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                    <span className="text-xs font-bold text-red-600/80 uppercase tracking-wider block mb-1">Şu Anki Durum</span>
                    <p className="text-emerald-900 text-sm font-medium">{item.mevcutDurum}</p>
                  </div>
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <span className="text-xs font-bold text-teal-600/80 uppercase tracking-wider block mb-1">Önerilen Çözüm</span>
                    <p className="text-emerald-900 text-sm font-medium">{item.onerilenDurum}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-emerald-700 pt-4 border-t border-emerald-100 gap-3">
                  <div className="flex gap-2">
                    <span className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-semibold">
                      Öneren: {item.adSoyad} ({item.calisanNo})
                    </span>
                    <span className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-semibold">
                      Departman: {item.departman}
                    </span>
                    {item.fotografVar && (
                      <span className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-semibold flex items-center gap-1">
                        📸 Ek Var
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
                    🤖 <span className="text-emerald-700 font-mono font-bold">NLP Duygu: %{(item.duyguSkoru * 100).toFixed(0)} Olumlu</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}