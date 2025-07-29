"use client";
import React, { useState } from "react";
import axios from "axios";

const Site = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  const generateSite = async () => {
    setLoading(true);
    setError("");
    setPreviewUrl("");

    try {
      const response = await axios.post("http://localhost:5000/generate-site", {
        prompt,
      });

      if (response.data?.previewUrl) {
        setPreviewUrl(`http://localhost:5000${response.data.previewUrl}`);
      } else {
        setError("Something went wrong. No preview URL returned.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to generate site.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-12 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🚀 AI Website Generator
      </h1>

      <textarea
        className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        placeholder="Describe your website idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateSite}
        disabled={loading}
        className={`mt-4 w-full py-3 px-6 rounded-lg text-white font-semibold transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating..." : "Generate Website"}
      </button>

      {error && (
        <p className="text-red-600 mt-4 text-center font-medium">❌ {error}</p>
      )}

      {previewUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-green-600 font-semibold mb-2">✅ Website Ready</h3>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Click here to preview your site
          </a>
        </div>
      )}
    </div>
  );
};

export default Site;
