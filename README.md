# Energy Consumption Forecasting & Carbon Footprint Analysis for Turkey (2026-2030)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TUBITAK](https://img.shields.io/badge/TUBITAK-2209--A-red)](https://tubitak.gov.tr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An interactive dashboard that visualizes a 3-stage machine learning pipeline for forecasting Turkey's electricity demand and CO2 emissions through 2030. Funded by TUBITAK 2209-A University Students Research Projects Program.

## Features

- **3-Stage ML Pipeline Visualization** -- Parameter analysis, electricity demand forecasting, and carbon footprint projection
- **Model Comparison** -- Side-by-side evaluation of Random Forest, XGBoost, and LSTM models with R2, RMSE, MAE, MAPE metrics
- **Interactive Forecast Charts** -- Electricity (TWh) and carbon emission (MtCO2) projections for 2026-2030
- **Cross-Validation Detail Tables** -- Year-by-year actual vs. predicted values with error percentages
- **Correlation Heatmap** -- Visual analysis of relationships between input parameters
- **Dark/Light Theme** -- Full theme support with smooth transitions
- **Responsive Design** -- Optimized for desktop and mobile viewing

## Pipeline Architecture

### Stage 1: Parameter Analysis

Time series forecasting of 13+ input features using Walk-Forward Cross-Validation:

| Feature Category | Examples |
|-----------------|----------|
| Demographics | Population, Urbanization Rate, Population Density |
| Economics | GDP Per Capita, GDP Growth, Industry Value Added (% GDP) |
| Energy | Renewables Share, Fossil Fuel Consumption, Nuclear Consumption |
| Environment | Coal CO2, Gas CO2, CO2 Per Capita, Temperature Change from GHG |

### Stage 2: Electricity Demand Forecasting

Three models trained with Optuna hyperparameter optimization predict Turkey's electricity demand in TWh:

| Model | Metrics |
|-------|---------|
| Random Forest | RMSE, MAE, MAPE, R2, RMSLE |
| XGBoost | RMSE, MAE, MAPE, R2, RMSLE |
| LSTM | RMSE, MAE, MAPE, R2, RMSLE |

### Stage 3: Carbon Footprint Projection

Combines electricity demand forecasts with feature predictions to project CO2 emissions (MtCO2) for 2026-2030. LSTM achieves the highest accuracy in this stage.
 
## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Charts | Recharts 3 |
| Animations | Framer Motion |
| Data Parsing | PapaParse |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yavuzhankursun/tez-enerji-karbon-dashboard.git
cd tez-enerji-karbon-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  App.tsx                    # Main application with 3-stage layout
  types.ts                   # TypeScript interfaces for all data models
  components/
    Hero.tsx                 # Landing section with key metrics
    Navigation.tsx           # Section navigation
    StageSection.tsx         # Reusable stage container
    ModelCard.tsx            # Model performance card
    MetricsTable.tsx         # Stage 1 metrics table
    ForecastChart.tsx        # Electricity & carbon forecast charts
    ForecastSummaryCard.tsx  # Forecast overview card
    CVDetailTable.tsx        # Cross-validation detail table
    GraphGallery.tsx         # Analysis graph gallery
    ThemeToggle.tsx          # Dark/light mode toggle
    Footer.tsx               # Page footer
  hooks/
    useData.ts               # Data fetching and parsing
    useDarkMode.ts           # Theme management
    useGraphImages.ts        # Graph image loading by stage
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
