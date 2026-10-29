# Energy & Carbon Forecasting Dashboard

Interactive results dashboard for the B.Sc. thesis
[**Machine Learning-Based Electricity Consumption Forecasting and Carbon Footprint Analysis**](https://github.com/yavuzhankursun/Machine-Learning-Based-Electricity-Consumption-Forecasting-and-Carbon-Footprint-Analysis)
(Kocaeli Health and Technology University, supported by the TÜBİTAK 2209-A programme).

It presents the output of a three-stage forecasting pipeline for Türkiye, 2026–2030: exogenous-variable forecasts (stage 1), electricity demand in TWh (stage 2) and the resulting carbon footprint in MtCO₂ (stage 3), each evaluated across seven models with walk-forward cross-validation.

![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3-22B5BF?style=flat-square)
![TÜBİTAK](https://img.shields.io/badge/TÜBİTAK-2209--A-004b87?style=flat-square)

## What it shows

- **Hero metrics** for the best model of each stage (R², MAE, MAPE).
- **Stage sections** with per-model metric tables and model cards for stages 1–3.
- **R² comparison** of the seven models (Random Forest, XGBoost, LightGBM, CatBoost, LSTM, ARIMA, SARIMA).
- **Feature importance** (SHAP) for electricity demand and carbon footprint.
- **2026–2030 forecast charts** with the LSTM point forecast and the cross-model range.
- **Walk-forward CV detail tables** per model and year.
- **Graph gallery** of the diagnostic plots produced by the pipeline (residuals, error bands, learning curves, SHAP, confusion matrices), grouped by stage.
- Light / dark theme toggle.

All numbers come from a single static file, `public/data.json`, which the pipeline in the thesis repository generates. The dashboard performs no computation of its own; it is a faithful view of the pipeline output.

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check (tsc -b) and build to dist/
npm run preview    # serve the production build
npm run lint       # eslint
```

Requirements: Node.js 20+.

## Project structure

```
public/
  data.json          Pipeline output: metrics, CV detail, forecasts, SHAP values
  graphs/            Diagnostic plots exported by the pipeline (asama1_*, asama2_*, asama3_*)
src/
  App.tsx            Page composition
  types.ts           Shape of data.json
  hooks/             useData, useDarkMode, useGraphImages
  components/        Hero, StageSection, MetricsTable, ModelCard, R2ComparisonSection,
                     FeatureImportanceSection, ForecastChart, ForecastSummaryCard,
                     GraphGallery, CVDetailTable, Navigation, ThemeToggle, Footer
```

> Naming note: `asama` is Turkish for "stage". Keys such as `asama2_metrikler` in `data.json` and the `asama1_*` graph prefixes map to stage 1, 2 and 3 of the pipeline.

## Updating the data

Re-run the pipeline in the thesis repository, then copy its results into `public/data.json` and the regenerated plots into `public/graphs/`. This repository is included in the thesis repository as a git submodule under `dashboard/`.

## Team

Betül Canol · Yavuzhan Kurşun · Eren Yalaz — advisor Dr. Yusuf Gürcan Şahin.
Kocaeli Health and Technology University, Faculty of Engineering and Natural Sciences.

Supported by the TÜBİTAK 2209-A University Students Research Projects Support Programme.
