// Aşama 1 hedef değişkenleri için Türkçe etiketler (kod genelinde diakritiksiz stil)
export const FEATURE_LABELS: Record<string, string> = {
  Population: "Nufus",
  Population_Density: "Nufus Yogunlugu",
  Urbanization_Rate: "Kentlesme Orani",
  GDP_Per_Capita: "Kisi Basina GSYH",
  GDP_Growth: "GSYH Buyume",
  Industry_Value_Added_Pct_GDP: "Sanayi Katma Degeri",
  renewables_share_elec: "Yenilenebilir Elektrik Payi",
  fossil_share_elec: "Fosil Elektrik Payi",
  nuclear_share_elec: "Nukleer Elektrik Payi",
  nuclear_consumption: "Nukleer Tuketim",
  fossil_fuel_consumption: "Fosil Yakit Tuketimi",
  primary_energy_consumption: "Birincil Enerji Tuketimi",
  energy_per_capita: "Kisi Basina Enerji",
  energy_per_gdp: "GSYH Basina Enerji",
  coal_co2: "Komur CO2",
  gas_co2: "Dogalgaz CO2",
  co2_per_capita: "Kisi Basina CO2",
  temperature_change_from_ghg: "Sera Gazi Sicaklik Degisimi",
};

export const MODEL_LABELS: Record<string, string> = {
  RF: "Random Forest",
  XGBoost: "XGBoost",
  LSTM: "LSTM",
  Linear: "Linear",
};

// R2 esik renklendirmesi (MetricsTable ile ayni semantik: yesil/sari/kirmizi)
export function r2HexColor(r2: number): string {
  if (r2 >= 0.7) return "#16a34a"; // green-600 - iyi
  if (r2 >= 0.4) return "#ca8a04"; // yellow-600 - orta
  return "#ef4444"; // red-500 - zayif
}
