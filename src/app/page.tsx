"use client";

import { useState } from "react";
import { translateToLegalese } from "./_services/openai";
import ContentText from "./_components/contentText";
import ErrorText from "./_components/errorText";
import { useLegaleseStore } from "./_stores/legalese";
import HistoryList from "./_components/historyList";

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
    <main className="flex h-full">
      <HistoryList
        legalese={legalese}
        currentLegalese={currentLegalese}
        setCurrentLegalese={setCurrentLegalese}
        remove={remove}
      />

      <div className="flex-1 px-5 xl:px-52 pt-10 h-full">
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
