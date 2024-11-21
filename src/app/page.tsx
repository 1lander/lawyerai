"use client";

import { useState } from "react";
import { translateToLegalese } from "./_services/openai";
import ContentText from "./_components/contentText";
import ErrorText from "./_components/errorText";
import { useLegaleseStore } from "./_stores/legalese";

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLegalese, setCurrentLegalese] = useState("");
  const { legalese, add, remove } = useLegaleseStore();

  const handleTranslate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const {response, isError} = await translateToLegalese(input);
      if (isError) {
        setError(response);
      } else {
        add(response);
        setCurrentLegalese(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    handleTranslate();
    setInput("");
    setCurrentLegalese("");
  }

  return (
    <main className="flex">
      <aside className="w-64 h-screen border-r border-gray-700 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <div className="space-y-3">
          {legalese.map((item, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer relative group"
            >
              <div onClick={() => setCurrentLegalese(item)}>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {item.length > 80 ? `${item.substring(0, 80)}...` : item}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(index);
                  if (currentLegalese === item) {
                    setCurrentLegalese("");
                  }
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-600 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex-1 px-52 pt-20">
        <h1 className="text-4xl font-bold text-center">Objection! Let&apos;s Make It Legal</h1>
        <div className="flex flex-col gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Enter your text here..."
            className="w-full rounded-md border border-gray-300 bg-black px-6 py-3 mt-4 text-lg resize-none min-h-[100px]"
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg disabled:opacity-50"
          >
            {isLoading ? "Translating..." : "Translate to Legal Terms"}
          </button>
          {error && (
            <ErrorText error={error} />
          )}
          {currentLegalese && (
            <ContentText text={currentLegalese} />
          )}
        </div>
      </div>
    </main>
  );
}
