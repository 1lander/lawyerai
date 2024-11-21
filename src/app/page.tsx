"use client";

import { useState } from "react";
import { translateToLegalese } from "./_services/openai";

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [legalese, setLegalese] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const {response, isError} = await translateToLegalese(input);
      if (isError) {
        setError(response);
      } else {
        setLegalese(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex-1 flex justify-center">
        <main className="flex flex-col gap-8 w-[600px] max-w-full">
          <h1 className="text-4xl font-bold text-center">Lawyer AI</h1>
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full rounded-md border border-gray-300 bg-black px-6 py-3 mt-4 text-lg"
            />
            <button
              onClick={handleTranslate}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg disabled:opacity-50"
            >
              {isLoading ? "Translating..." : "Translate to Legal Terms"}
            </button>
            {error && (
              <div className="mt-8 p-6 border border-red-400 rounded-md bg-red-900">
                <h2 className="text-xl font-semibold mb-4 text-red-200">Error:</h2>
                <p className="text-red-200">{error}</p>
              </div>
            )}
            {legalese && (
              <div className="mt-8 p-6 border border-gray-700 rounded-md bg-gray-900">
                <h2 className="text-xl font-semibold mb-4">Legal Translation:</h2>
                <p className="text-gray-200">{legalese}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
