import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
} from "recharts";

const defaultResponse = {
  change_point: "2008-07-29",
  mean_before: 0.000354,
  mean_after: -0.000082,
  volatility_before: 0.023034,
  volatility_after: 0.028856,
  percent_change: -123.16,
  source: "default",
  log_return_series: [],
};

const CsvUpload = () => {
  const [response, setResponse] = useState(defaultResponse);
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data);

      const timeSeries = res.data.log_return_series || [];
      const formatted = timeSeries.map(([date, value]) => ({
        date,
        log_return: value,
      }));
      setLogData(formatted);
    } catch (err) {
      setError("Upload failed. Please check your file and server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatChangeLabel = (val) =>
    val !== null && val !== undefined ? val.toFixed(6) : "N/A";

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">📁 Upload Brent Oil CSV</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        className="mb-4"
      />
      {loading && <p className="text-blue-600">Processing file...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div
        className={`mt-2 p-4 rounded ${
          response.source === "uploaded" ? "bg-yellow-100" : "bg-blue-100"
        }`}
      >
        <p className="font-bold text-lg mb-2">
          {response.source === "uploaded"
            ? "📁 Uploaded Result"
            : "📊 Default Result"}
        </p>
        <ul className="list-disc ml-5 text-sm space-y-1">
          <li>
            <strong>Change Point:</strong> {response.change_point}
          </li>
          <li>
            <strong>Mean Before:</strong>{" "}
            {formatChangeLabel(response.mean_before)}
          </li>
          <li>
            <strong>Mean After:</strong>{" "}
            {formatChangeLabel(response.mean_after)}
          </li>
          <li>
            <strong>Volatility Before:</strong>{" "}
            {formatChangeLabel(response.volatility_before)}
          </li>
          <li>
            <strong>Volatility After:</strong>{" "}
            {formatChangeLabel(response.volatility_after)}
          </li>
          <li>
            <strong>Percent Change:</strong>{" "}
            {response.percent_change?.toFixed(2)}%
          </li>
        </ul>
      </div>

      {logData.length > 0 && (
        <>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              📈 Log Returns Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={logData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip formatter={(v) => v.toFixed(6)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="log_return"
                  stroke="#007acc"
                  dot={false}
                  name="Log Return"
                />
                <ReferenceLine
                  x={response.change_point}
                  stroke="red"
                  label={{ value: "Change Point", position: "top" }}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              📊 Mean & Volatility Comparison
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  {
                    name: "Before",
                    mean: response.mean_before,
                    vol: response.volatility_before,
                  },
                  {
                    name: "After",
                    mean: response.mean_after,
                    vol: response.volatility_after,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mean" fill="#82ca9d" name="Mean Return" />
                <Bar dataKey="vol" fill="#8884d8" name="Volatility" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CsvUpload;
