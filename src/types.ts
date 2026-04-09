export interface Asama1Metric {
  feature: string;
  country: string;
  secilen_model: string;
  wf_cv_r2: number;
  wf_cv_mape: number;
  wf_cv_rmse: number;
  wf_cv_n: number;
}

export interface Asama1Tahmin {
  country: string;
  iso_code: string;
  year: number;
  Population: number;
  GDP_Per_Capita: number;
  GDP_Growth: number;
  renewables_share_elec: number;
  Urbanization_Rate: number;
  Industry_Value_Added_Pct_GDP: number;
  Population_Density: number;
  fossil_fuel_consumption: number;
  nuclear_consumption: number;
  coal_co2: number;
  gas_co2: number;
  co2_per_capita: number;
  Electricity_Loss_Pct: number | null;
  temperature_change_from_ghg: number;
}

export interface Asama2Metric {
  model: string;
  rmse: number;
  mae: number;
  mape: number;
  r2: number;
  rmsle: number;
  optuna_cv_rmse: number;
}

export interface Asama2Forecast {
  year: number;
  RF_TWh: number;
  XGBoost_TWh: number;
  LSTM_TWh: number;
}

export interface Asama2CVDetail {
  model: string;
  year: number;
  gercek_TWh: number;
  tahmin_TWh: number;
  hata_pct: number;
}

export interface Asama3Metric {
  model: string;
  rmse: number;
  mae: number;
  mape: number;
  r2: number;
  optuna_cv_rmse: number;
}

export interface Asama3Forecast {
  year: number;
  RF_MtCO2: number;
  XGBoost_MtCO2: number;
  LSTM_MtCO2: number;
}

export interface Asama3CVDetail {
  model: string;
  year: number;
  gercek_MtCO2: number;
  tahmin_MtCO2: number;
  hata_pct: number;
}

export interface TurkeyHistorical {
  country: string;
  year: number;
  iso_code: string;
  electricity_demand: number;
  Population: number;
  renewables_share_elec: number;
  Population_Density: number;
  GDP_Growth: number;
  GDP_Per_Capita: number;
  Industry_Value_Added_Pct_GDP: number;
  Urbanization_Rate: number;
}

export interface DashboardData {
  asama1_metrikler: Asama1Metric[];
  asama1_tahminler: Asama1Tahmin[];
  asama2_metrikler: Asama2Metric[];
  asama2_forecast: Asama2Forecast[];
  asama2_cv_detay: Asama2CVDetail[];
  asama3_metrikler: Asama3Metric[];
  asama3_forecast: Asama3Forecast[];
  asama3_cv_detay: Asama3CVDetail[];
  turkey_gecmis: TurkeyHistorical[];
}
