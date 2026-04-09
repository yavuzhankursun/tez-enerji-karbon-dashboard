const VERI_KAYNAKLARI = [
  { isim: 'Our World in Data (OWID)', aciklama: 'Enerji tuketimi, CO2 emisyonu verileri', url: 'https://ourworldindata.org' },
  { isim: 'Dunya Bankasi (World Bank)', aciklama: 'GDP, nufus, kentlesme, sanayi verileri', url: 'https://data.worldbank.org' },
  { isim: 'IEA (International Energy Agency)', aciklama: 'Elektrik uretim ve tuketim istatistikleri', url: 'https://www.iea.org/data-and-statistics' },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Veri Kaynaklari */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
            Veri Kaynaklari
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VERI_KAYNAKLARI.map((v, i) => (
              <a
                key={i}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-xl border border-gray-100 dark:border-gray-800
                           hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {v.isim}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {v.aciklama}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Alt bilgi */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wide">
            Makine Ogrenmesi ile Enerji Tuketimi Tahmini ve Karbon Ayak Izi Analizi
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
            Yavuzhan Kursun, Betul Canol, Eren Yalaz
          </p>
        </div>

      </div>
    </footer>
  );
}
