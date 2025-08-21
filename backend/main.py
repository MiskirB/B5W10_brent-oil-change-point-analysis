from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import pymc as pm
import io

app = FastAPI()

# 🔓 CORS for frontend (e.g., Vite on localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "OK", "message": "Brent Oil Change Point API is running."}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents), parse_dates=["Date"])
    df = df.sort_values("Date")
    df["Log_Return"] = np.log(df["Price"]).diff()
    df.dropna(inplace=True)

    log_returns = df["Log_Return"].values
    n = len(log_returns)

    with pm.Model() as model:
        tau = pm.DiscreteUniform("tau", lower=0, upper=n)
        mu1 = pm.Normal("mu1", mu=0, sigma=1)
        mu2 = pm.Normal("mu2", mu=0, sigma=1)
        sigma1 = pm.Exponential("sigma1", 1.0)
        sigma2 = pm.Exponential("sigma2", 1.0)

        mu = pm.math.switch(tau >= np.arange(n), mu1, mu2)
        sigma = pm.math.switch(tau >= np.arange(n), sigma1, sigma2)

        obs = pm.Normal("obs", mu=mu, sigma=sigma, observed=log_returns)
        trace = pm.sample(3000, tune=1000, cores=1, return_inferencedata=False, progressbar=False)

    tau_samples = trace["tau"]
    most_likely_tau = int(np.median(tau_samples))
    change_point_date = df["Date"].iloc[most_likely_tau].strftime("%Y-%m-%d")

    before = df["Log_Return"].iloc[:most_likely_tau]
    after = df["Log_Return"].iloc[most_likely_tau:]

    mean_before = before.mean()
    mean_after = after.mean()
    volatility_before = before.std()
    volatility_after = after.std()
    percent_change = ((mean_after - mean_before) / abs(mean_before)) * 100

    # 🟢 Send the last 500 data points for smoother frontend rendering
    log_return_series = df[["Date", "Log_Return"]].iloc[-500:].apply(
        lambda row: [row["Date"].strftime("%Y-%m-%d"), row["Log_Return"]],
        axis=1
    ).tolist()

    return {
        "change_point": change_point_date,
        "mean_before": round(mean_before, 6),
        "mean_after": round(mean_after, 6),
        "volatility_before": round(volatility_before, 6),
        "volatility_after": round(volatility_after, 6),
        "percent_change": round(percent_change, 2),
        "source": "uploaded",
        "log_return_series": log_return_series
    }
