import { useData } from "./hooks/useData";
import { useDarkMode } from "./hooks/useDarkMode";
import { getGraphsByStage } from "./hooks/useGraphImages";
import { Navigation } from "./components/Navigation";
import { ThemeToggle } from "./components/ThemeToggle";
import { Hero } from "./components/Hero";
import { StageSection } from "./components/StageSection";
import { MetricsTable } from "./components/MetricsTable";
import { ModelCard } from "./components/ModelCard";
import { ForecastChart } from "./components/ForecastChart";
import { ForecastSummaryCard } from "./components/ForecastSummaryCard";
import { GraphGallery } from "./components/GraphGallery";
import { CVDetailTable } from "./components/CVDetailTable";
import { Footer } from "./components/Footer";
import { LoadingScreen, ErrorScreen } from "./components/LoadingScreen";

function App() {
  const { data, loading, error } = useData();
  const [isDark, toggleDark] = useDarkMode();

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen message={error ?? "Veri bulunamadi"} />;

  const asama1Images = getGraphsByStage("asama1");
  const asama2Images = getGraphsByStage("asama2");
  const asama3Images = getGraphsByStage("asama3");

  const bestAsama2Model = data.asama2_metrikler.reduce((a, b) =>
    a.r2 > b.r2 ? a : b
  ).model;

  const bestAsama3Model = data.asama3_metrikler.reduce((a, b) =>
    a.r2 > b.r2 ? a : b
  ).model;

  const asama2CVData = data.asama2_cv_detay.map((d) => ({
    model: d.model,
    year: d.year,
    actual: d.gercek_TWh,
    predicted: d.tahmin_TWh,
    errorPct: d.hata_pct,
  }));

  const asama3CVData = data.asama3_cv_detay.map((d) => ({
    model: d.model,
    year: d.year,
    actual: d.gercek_MtCO2,
    predicted: d.tahmin_MtCO2,
    errorPct: d.hata_pct,
  }));

  const co2Historical = data.turkey_gecmis.map((h) => ({
    year: h.year,
    value: 0,
  }));

  const co2FromCV = data.asama3_cv_detay
    .filter((d) => d.model === "LSTM")
    .map((d) => ({
      year: d.year,
      value: d.gercek_MtCO2,
    }));

  const co2HistoricalMerged = co2FromCV.length > 0 ? co2FromCV : co2Historical;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <ThemeToggle isDark={isDark} toggle={toggleDark} />
      <Navigation />

      <div id="hero">
        <Hero
          asama1Metrics={data.asama1_metrikler}
          asama2Metrics={data.asama2_metrikler}
          asama3Metrics={data.asama3_metrikler}
        />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

      {/* Korelasyon Isi Haritasi */}
      <section className="px-6 py-16 md:px-12 lg:px-20 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Degiskenler Arasi Korelasyon Analizi
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Elektrik tuketimini etkileyen parametrelerin birbirleriyle iliskisi.
            1.00'a yaklasan degerler guclu pozitif, -1.00'a yaklasan degerler guclu negatif iliski gosterir.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
          <img
            src="/graphs/korelasyon_isi_haritasi.png"
            alt="Korelasyon Isi Haritasi"
            className="w-full rounded-xl dark:bg-gray-800"
          />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

      {/* Tahminler - Key Predictions First */}
      <section
        id="tahminler"
        className="px-6 py-20 md:px-12 lg:px-20 max-w-6xl mx-auto"
      >
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-orange-500" />
            <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-3 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-300">
              Tahminler
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            2026-2030 Projeksiyonlari
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">
            Uc farkli makine ogrenmesi modelinin Turkiye icin elektrik tuketimi ve karbon emisyonu tahminleri. Asagidaki grafikler gecmis verileri ve gelecek projeksiyonlarini bir arada gostermektedir.
          </p>
          <div className="h-px w-16 bg-gradient-to-r from-blue-600/20 to-orange-500/20 mt-5" />
        </div>

        <div className="space-y-8">
          <ForecastSummaryCard
            electricityForecast={data.asama2_forecast}
            carbonForecast={data.asama3_forecast}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ForecastChart
              type="electricity"
              historical={data.turkey_gecmis}
              forecast={data.asama2_forecast}
              isDark={isDark}
            />
            <ForecastChart
              type="carbon"
              historical={co2HistoricalMerged}
              forecast={data.asama3_forecast}
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

      {/* Asama 2 - Elektrik Detay */}
      <StageSection
        id="asama2"
        stageNumber={2}
        title="Elektrik Talebi Tahmini"
        subtitle="Asama 1 ciktilarini kullanarak Turkiye'nin elektrik talebini tahmin eden uc farkli model. Random Forest, XGBoost ve LSTM karsilastirilmasi."
        accentColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.asama2_metrikler.map((m) => (
            <ModelCard
              key={m.model}
              metrics={m}
              isBest={m.model === bestAsama2Model}
              accentColor="blue"
            />
          ))}
        </div>

        <CVDetailTable data={asama2CVData} unit="TWh" />

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Model Analiz Grafikleri
          </h3>
          <GraphGallery images={asama2Images} columns={3} />
        </div>
      </StageSection>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

      {/* Asama 3 - Karbon Detay */}
      <StageSection
        id="asama3"
        stageNumber={3}
        title="Karbon Ayak Izi Tahmini"
        subtitle="Elektrik talebi ve feature tahminlerini birlestirerek CO2 emisyonlarinin 2026-2030 projeksiyonu. LSTM modeli en yuksek dogrulugu sagliyor."
        accentColor="orange"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.asama3_metrikler.map((m) => (
            <ModelCard
              key={m.model}
              metrics={m}
              isBest={m.model === bestAsama3Model}
              accentColor="orange"
            />
          ))}
        </div>

        <CVDetailTable data={asama3CVData} unit="MtCO2" />

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Model Analiz Grafikleri
          </h3>
          <GraphGallery images={asama3Images} columns={3} />
        </div>
      </StageSection>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

      {/* Asama 1 - Parametre Analizi (en teknik, en sonda) */}
      <StageSection
        id="asama1"
        stageNumber={1}
        title="Parametre Analizi"
        subtitle="Her bir girdi degiskeninin zaman serileriyle tahmin edilmesi. Populasyon, GSYH, enerji tuketimi ve diger 13 feature icin en iyi model secimi."
        accentColor="green"
      >
        <MetricsTable metrics={data.asama1_metrikler} />

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Analiz Grafikleri
          </h3>
          <GraphGallery images={asama1Images} columns={3} />
        </div>
      </StageSection>

      <Footer />
    </div>
  );
}

export default App;
