# Brent Oil Change Point Analysis

## 📌 Project Summary

This project applies Bayesian Change Point Detection to Brent Oil historical prices to identify significant shifts in price volatility and behavior. The key goals were:

- Detect statistical change points in log returns of oil prices
- Compare market dynamics before and after change points
- Visualize time series dynamics, distributions, and model inferences
- Deploy an interactive dashboard for analysts

---

## 📁 Project Structure

```
B5W10_brent-oil-change-point-analysis/
│
├── backend/
│   ├── main.py                # FastAPI backend with Bayesian analysis
│   └── requirements.txt       # Backend dependencies
│
├── frontend/
│   ├── components/
│   │   └── CsvUpload.jsx      # File uploader and results display
│   └── App.jsx                # Main UI layout
│
├── dashboard/                 # 📊 Final deployed dashboard UI
│   └── ...
│
├── outputs/
│   ├── plots/                 # All visualizations from analysis
│   │   ├── rawprices.png
│   │   ├── tau.png
│   │   ├── ...
│   └── reports/
│       └── Brent_change_point_final_report_Miskir_Besir_Abshir.docx
```

---

## 📈 Visualizations

All plots are saved under `outputs/plots/`, including:

- Raw price trends
- Log returns over time
- Change point posterior samples (`tau`)
- Distributions before and after change
- Annotated price history with major global events

---

## 🔍 Key Findings

- **Change Point Date**: Identified statistically via Bayesian inference.
- **Mean Shift**: Clear difference in average log return before vs after.
- **Volatility Increase**: Substantial jump in standard deviation post-change.
- **Posterior Distribution**: Mode of tau pinpoints likely shift location.

---

## 🚀 Dashboard

A React + FastAPI powered dashboard was built and deployed to allow:

- Uploading custom `.csv` files
- Automatic change point analysis
- Real-time display of metrics and charts

Found in the `/dashboard` folder.

---

## 🧠 Technologies Used

- Python, FastAPI, PyMC
- React + Tailwind
- Pandas, NumPy, ArviZ, Matplotlib
- Docker & GitHub Actions (optional for CI/CD)

---

## 👨‍💻 Author

**Miskir Besir Abshir**  
KAIM Challenge: B5W10  
2025
