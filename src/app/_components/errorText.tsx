interface ErrorTextProps {
  error: string;
}

export default function ErrorText({ error }: ErrorTextProps) {
  return (
    <div className="mt-8 p-6 border border-red-400 rounded-md bg-red-900">
      <h2 className="text-xl font-semibold mb-4 text-red-200">Error:</h2>
      <p className="text-red-200">{error}</p>
    </div>
  );
}