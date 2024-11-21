import toast from "react-hot-toast";

interface ContentTextProps {
  text: string;
}

export default function ContentText({ text }: ContentTextProps) {
  const notify = () => toast('Copied to clipboard');

  return (
    <div className="mt-8 p-6 border border-gray-700 rounded-md bg-gray-900 relative">
      <button
        onClick={() => {
          navigator.clipboard.writeText(text);
          notify();
        }}
        className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-md"
        title="Copy to clipboard"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      </button>
      <h2 className="text-xl font-semibold mb-4">Legal Translation:</h2>
      <p className="text-gray-200">{text}</p>
    </div>
  );
}