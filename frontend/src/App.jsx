import React from "react";
import CsvUpload from "./components/CsvUpload";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          📊 Brent Oil Change Point Detector
        </h1>
        <p className="text-gray-600 mb-8">
          Upload your Brent crude oil CSV file and detect significant volatility
          shifts.
        </p>
      </div>

      <CsvUpload />

      <footer className="mt-10 text-center text-sm text-gray-500">
        Built for Nova Challenge B5W10 &mdash; KAIM Analytics by Miskir Besir
        Abshir © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
