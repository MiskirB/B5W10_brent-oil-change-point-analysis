# Interim 1 Report – Change Point Analysis of Brent Oil Prices

**Project**: Birhan Energies  
**Contributor**: Miskir Besir Abshir  
**Submission Date**: August 4, 2025  
**Focus**: Task 1 – Laying the Foundation for Analysis  
**RepoLink**: [GitHub Repository](https://github.com/MiskirB/B5W10_brent-oil-change-point-analysis)

---

## 1. Project Overview

This project aims to study how significant political, economic, and OPEC-related events affect Brent oil prices. By applying Bayesian change point analysis to a long-term historical oil price dataset, we seek to identify when statistically significant structural breaks occurred and match them with real-world events to generate insights for investors, policymakers, and energy companies.

---

## 2. Data Analysis Workflow

The workflow consists of the following steps:

- Load and clean Brent oil price data from 1987 to 2022.
- Calculate log returns to induce stationarity in the time series.
- Visualize both raw prices and log returns.
- Compile a structured event dataset with major events and dates.
- Explore time series properties such as trend and volatility.
- Build Bayesian change point detection model using PyMC3.
- Match change point dates with real-world events for interpretation.
- Build an interactive dashboard (planned for Task 3).

---

## 3. Assumptions and Limitations

- Assumption: Events have an immediate impact on prices (no time lag modeled).
- Limitation: Only one change point is modeled per run for simplicity.
- Limitation: Model detects statistical correlation, not causation.
- Assumption: Log return transformation makes the series more suitable for modeling.
- Limitation: No external macroeconomic factors (like exchange rates or inflation) are included yet.

---

## 4. Communication Strategy

- **Investors**: Dashboard with interactive filters by event/date/volatility.
- **Policymakers**: Reports with quantitative summaries and historical context.
- **General Public**: Blog post or Medium article with visuals and simplified insights.
- **Internal Analysts**: GitHub repository with notebooks, visualizations, and data.

---

## 5. Understanding the Model and Data

Change point models are designed to identify moments in a time series where behavior (e.g., mean or variance) changes significantly.

**Model Elements**:

- τ (tau): Unknown change point estimated using a discrete uniform prior.
- μ₁, μ₂: Mean of the distribution before and after the change.
- Likelihood: Normal distribution modeled on log returns.

**Outputs**:

- Posterior distribution of τ
- Posterior means μ₁ and μ₂
- Visual insights into market regime shifts

---

## 6. Time Series Observations

- Price shows strong upward trend until 2008, followed by volatility.
- Significant spikes coincide with geopolitical events and economic crises.
- Log returns display volatility clustering.
- The transformation stabilizes variance and helps modeling structural changes.

---

## 7. Visualizations

Visuals are included in the `pdf` report. Please refer to:

- **Figure 1**: Daily Brent Oil Prices (USD/barrel)
- **Figure 2**: Brent Oil Prices with Major Global Events Overlaid
