
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex-1 flex justify-center">
        <main className="flex flex-col gap-8 w-[600px] max-w-full">
          <h1 className="text-4xl font-bold text-center">Lawyer AI</h1>
          <input type="text" className="w-full rounded-md border border-gray-300 bg-black px-6 py-3 mt-4 text-lg" />
        </main>
      </div>
    </div>
  );
}
