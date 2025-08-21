# ⛽ Brent Oil Change Point Analysis (B5W10 Project)

This project detects **significant statistical change points** in Brent oil prices using **Bayesian Inference** and visualizes the results through an interactive frontend.

## 📌 Features

- Upload your Brent oil price `.csv`
- Perform Bayesian change point detection (via PyMC)
- Get:
  - Change point date
  - Mean + volatility shift analysis
  - Visual summaries
- Interactive web UI built with React + FastAPI
- Deployment-ready dashboard

---

## 📁 Folder Overview

```
.
├── backend/           # FastAPI Bayesian detection server
├── frontend/          # React-based CSV upload and charting
├── dashboard/         # Final production dashboard UI
├── outputs/
│   ├── plots/         # Visuals (PNG)
│   └── reports/       # Word and Markdown Reports
```

---

## 📊 Example Visualizations

- `rawprices.png`
- `Log returns of Brent Oil Prices.png`
- `Most likely change point date.png`
- `Log Return Distributions Before and After Change Point.png`
- `tau.png`, `Posterior Summary.png`

---

## ⚙️ Requirements

See: `backend/requirements.txt`

Ensure Python 3.10+ is used for full compatibility with `pymc` and `arviz`.

---

## 🚀 Deployment (Optional)

You can deploy on Render, Heroku, or locally using:

```bash
cd backend
uvicorn main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

---

## 👤 Author

Built by **Miskir Besir Abshir**  
For **KAIM Challenge B5W10**  
Aug 2025
