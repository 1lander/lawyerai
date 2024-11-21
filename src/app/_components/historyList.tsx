interface HistoryListProps {
  legalese: Array<{text: string, timestamp: string}>;
  currentLegalese: string;
  setCurrentLegalese: (text: string) => void;
  remove: (index: number) => void;
}

export default function HistoryList({
  legalese,
  currentLegalese,
  setCurrentLegalese,
  remove
}: HistoryListProps) {
  return (
    <aside className="w-32 xl:w-64 h-full border-r border-gray-700 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">History</h2>
      <div className="space-y-3">
        {legalese.map((item, index) => (
          <div 
            key={index}
            className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer relative group"
          >
            <div onClick={() => setCurrentLegalese(item.text)}>
              <p className="text-sm text-gray-300 line-clamp-2">
                {item.text.length > 80 ? `${item.text.substring(0, 80)}...` : item.text}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                remove(index);
                if (currentLegalese === item.text) {
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
  );
}