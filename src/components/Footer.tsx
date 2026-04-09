const KAYNAKLAR = [
  {
    yazar: 'Arslan, S.',
    yil: 2022,
    baslik: 'A hybrid forecasting model using LSTM and Prophet for energy consumption with decomposition of time series data',
    dergi: 'PeerJ Computer Science',
    cilt: '8, e1001',
    doi: 'https://doi.org/10.7717/peerj-cs.1001',
  },
  {
    yazar: 'Costantini, L., Laio, F., Mariani, M. S., & Ridolfi, L.',
    yil: 2024,
    baslik: 'Forecasting national CO2 emissions worldwide',
    dergi: 'Scientific Reports',
    cilt: '14, 22438',
    doi: 'https://doi.org/10.1038/s41598-024-73060-0',
  },
  {
    yazar: 'Tian, L., Zhang, Z., He, Z., Yuan, C., Xie, Y., Zhang, K., & Jing, R.',
    yil: 2025,
    baslik: 'Predicting energy-based CO2 emissions in the United States using machine learning: A path toward mitigating climate change',
    dergi: 'Sustainability',
    cilt: '17(7), 2843',
    doi: 'https://doi.org/10.3390/su17072843',
  },
  {
    yazar: 'Abrar, M.',
    yil: 2025,
    baslik: 'Supervised machine learning for predicting sustainable energy needs',
    dergi: 'GitHub (Source Code)',
    cilt: '',
    doi: 'https://github.com/Mabrar92/Supervised-ML-Based-Energy-Consumption-Predictions',
  },
];

const VERI_KAYNAKLARI = [
  { isim: 'Our World in Data (OWID)', aciklama: 'Enerji tuketimi, CO2 emisyonu verileri', url: 'https://ourworldindata.org' },
  { isim: 'Dunya Bankasi (World Bank)', aciklama: 'GDP, nufus, kentlesme, sanayi verileri', url: 'https://data.worldbank.org' },
  { isim: 'IEA (International Energy Agency)', aciklama: 'Elektrik uretim ve tuketim istatistikleri', url: 'https://www.iea.org/data-and-statistics' },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Kaynakca */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 tracking-tight">
            Kaynakca
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            Bu projede referans alinan bilimsel calisma ve veri kaynaklari
          </p>

          <div className="space-y-4">
            {KAYNAKLAR.map((k, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-gray-300 dark:text-gray-600 font-mono text-xs mt-0.5 shrink-0">
                  [{i + 1}]
                </span>
                <div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {k.yazar} ({k.yil}).{' '}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {k.baslik}.
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 italic">
                    {' '}{k.dergi}
                    {k.cilt ? `, ${k.cilt}` : ''}.
                  </span>
                  <br />
                  <a
                    href={k.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:underline text-xs break-all"
                  >
                    {k.doi}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

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
            TUBITAK 2209-A Universite Ogrencileri Arastirma Projeleri Destekleme Programi | 2025
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
            Makine Ogrenmesi ile Enerji Tuketimi Tahmini ve Karbon Ayak Izi Analizi
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
            Betul Canol, Eren Yalaz | Dansman: Yusuf Gurcan Sahin | Kocaeli Saglik ve Teknoloji Universitesi
          </p>
        </div>

      </div>
    </footer>
  );
}
