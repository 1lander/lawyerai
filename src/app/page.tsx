"use client";

import { useState } from "react";
import { translateToLegalese } from "./_services/openai";
import ContentText from "./_components/contentText";
import ErrorText from "./_components/errorText";

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
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
      <main className="flex flex-col gap-8 w-[600px] max-w-full">
        <h1 className="text-4xl font-bold text-center">Objection! Let&apos;s Make It Legal</h1>
        <div className="flex flex-col gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                e.preventDefault();
                handleTranslate();
              }
            }}
            placeholder="Enter your text here..."
            className="w-full rounded-md border border-gray-300 bg-black px-6 py-3 mt-4 text-lg resize-none min-h-[100px]"
          />
          <button
            onClick={handleTranslate}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg disabled:opacity-50"
          >
            {isLoading ? "Translating..." : "Translate to Legal Terms"}
          </button>
          {error && (
            <ErrorText error={error} />
          )}
          {legalese && (
            <ContentText text={legalese} />
          )}
        </div>
      </main>
  );
}
