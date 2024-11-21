
export default function About() {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">

    <main className="flex flex-col items-center gap-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">About Lawyer AI</h1>
      
      <section className="space-y-6 text-lg">
        <p>
          Lawyer AI is your bridge between everyday language and professional legal terminology. We help you communicate your ideas with the precision and formality that legal contexts require.
        </p>

        <p>
          Whether you&apos;re drafting a contract, preparing a legal document, or just trying to understand legal jargon, our AI assistant transforms your natural language into proper legal terminology that lawyers use in their professional practice.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How It Helps You</h2>
        
        <ul className="space-y-4 list-disc pl-6">
          <li>Converts casual language into professional legal terminology</li>
          <li>Ensures your documents maintain proper legal formatting and structure</li>
          <li>Helps you communicate more effectively with legal professionals</li>
          <li>Saves time and reduces misunderstandings in legal communications</li>
        </ul>
      </section>
      </main>
    </div>
  );
}
