import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center p-4 border-b border-gray-800">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L3 9V11H21V9L12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 11V17M17 11V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5 17H9M15 17H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 21H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="font-bold text-2xl">Lawyer AI</span>
        </div>
        <nav className="flex gap-4">
          <Link 
            href="/" 
            className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-1 rounded-md hover:bg-gray-800 border border-gray-700"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-1 rounded-md hover:bg-gray-800 border border-gray-700"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
